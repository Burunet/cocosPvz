import { _decorator, AudioSource, Component, EventMouse, find, input, Input, instantiate, log, Node, Prefab, Vec3 } from 'cc';
import { PlantType,CardState, CellState, GameState } from './Global';
import { Plant } from '../Plant';
import { Cell } from '../Game/Cell';
import { GlobalManager } from './GlobalManager';
import { Card } from '../Card';
import { GameLoading } from './managerGame/GameLoading';
import { Camera } from './Camera';
import { ZombieManager } from './ZombieManager';
const { ccclass, property } = _decorator;

@ccclass('MouseManager')
export class MouseManager extends Component {
    private static _instance: MouseManager =null;
    
    //存在的植物预设
    @property([Prefab])
    public plantPrefabArray:Prefab[]=[];
    //音乐组
    @property([AudioSource])
    public audioSourcebArray: AudioSource[] = [];

    //游戏状态
    public gameState:GameState = GameState.CardSelection;
    //创建的植物节点
    public currentPlant:Node;
    //预处理 
    // -准备扣除的阳光
    public needSunPointCase:number=0;
    // 被点击了的card脚本
    public plantCard:Card;


    //生命周期 初始化 onload 
    protected onLoad(): void {
        //全局只充存着一个
        if(MouseManager._instance == null){
            MouseManager._instance = this;
        }else{
            this.node.destroy();
            return;
        }
        //添加鼠标移动事件
        input.on(Input.EventType.MOUSE_MOVE,this.onMouseMove,this)
    }

    protected start(): void {
        // this.transitionToLoading()
        // this.transitionToAfoot()
    }
    
    //鼠标移动事件
    onMouseMove(event:EventMouse){
        this.followCursor(event);
    }

    //局内，点击可种植植物 创建植物实例
    addPlant(Type:PlantType,event:EventMouse):boolean {
        if(this.currentPlant!=null)return false;
        let plantPrefab = this.getPlantPrefab(Type);
        if(plantPrefab == null){
            console.log('植物逻辑不存在');
            return false;
        }
        this.currentPlant = instantiate(plantPrefab);
        // this.currentPlant.parent = this.node.parent
        this.currentPlant.parent = find('Canvas/Game')
        this.followCursor(event);
        return true;
    }

    // 是否有设定该植物的脚本，有则返回，无则为空
    getPlantPrefab(Type:PlantType):Node {
        for(let plantPrefab of this.plantPrefabArray){
            let plantNode=instantiate(plantPrefab) 
            if(plantNode.getComponent(Plant).PlantType == Type){
                return plantNode;
            }else{
                plantNode.destroy();
            }
        }
        return null;
    }

    //植物跟随鼠标
    followCursor(event:EventMouse){
        if(this.currentPlant==null)return;
        //取得鼠标位置 --取得的是二维坐标（x,y）
        let mousePos = event.getUILocation();
        //cocos需要三维坐标 转化为三维
        let worldPos = new Vec3(mousePos.x,mousePos.y,0);
        //给植物节点位置
        this.currentPlant.setWorldPosition(worldPos);
    }
    //点击格子种植
    onCellClick(cell:Cell){
        
        if(cell.nowCellState()) return; //格子不支持
        //扣除阳光-进入冷却
        GlobalManager.Instance.subSun(-this.needSunPointCase)
        this.plantCard.changeState(CardState.Cooling)

        //设置植物,修改植物父级
        let plantCell = cell.node.parent.getChildByName('Plant');
        this.currentPlant.parent =plantCell;

        let position = new Vec3( cell.node.position.x,0,0);
        this.currentPlant.setPosition(position);

        // 获取植物脚本
        let plantScript = this.currentPlant.getComponent(Plant);
        plantScript.CellName = cell.node.name;
        if (plantScript) {
            cell.audioSource.play() //播放种植音乐
            plantScript.transitionToEnable();  // 激活植物
        } else {
            console.error("Failed to retrieve Plant script from currentPlant");
        }
        //释放当前植物-清除预设
        this.onFund()
        //将格子状态修改为 have
        cell.changeCellState(CellState.Have);
    }


   
// 转到游戏加载中
    transitionToLoading(){
        this.gameState = GameState.Loading;
       
         setTimeout(()=>{
            //摄像机移动预设位置
            let camera = find('Canvas/Camera').getComponent(Camera);
            camera.state=true;
        },2000)
    }
        //摄像头到达预定位置后执行
        toLoading(){
            this.audioSourcebArray[2].stop()
            let gameLoading = find('Canvas/Manager/gameLoading').getComponent(GameLoading);
            gameLoading.onStartToGameLodding()
        }
// 转到游戏进行中
    transitionToAfoot(){
        find('Canvas/Manager/gameLoading').destroy()
        find('Canvas/Camera').getComponent(Camera).onMovetoAction()
        this.ReadyAudio(0);
        this.gameState = GameState.Afoot;
        this.node.getComponent(GlobalManager).creatCardList()
        //触发僵尸创建
        ZombieManager.Instance.createZombie()
    }
    //BGM 控制
    ReadyAudio(num:number){
        for(let audioSourceb of this.audioSourcebArray){
            audioSourceb.stop();
        }
         this.audioSourcebArray[num].play()
    }

     //获取实例
     public static get Instance():MouseManager{
        return this._instance;
    }
    //节点-销毁处理
    protected onDestroy(): void {
        input.off(Input.EventType.MOUSE_MOVE,this.onMouseMove,this)
    }

//释放当前对象-清除预设
    onFund(){
        this.needSunPointCase=0;
        this.plantCard = null;
        this.currentPlant = null;
    }
}


