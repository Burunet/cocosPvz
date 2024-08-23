import { _decorator, CCFloat, Component, log, Node } from 'cc';
import { GameState, ZombiesAct, ZombiesState } from '../manager/Global';
import { MouseManager } from '../manager/MouseManager';
import { Plant } from '../Plant';
const { ccclass, property } = _decorator;

@ccclass('Zombies')
export class Zombies extends Component {
    @property(CCFloat)
    public HPnum:number=270;            //hp
    @property(CCFloat)
    public LingHp:number = 90;          //在达到有效零界点时以每秒60扣除血量
    @property(CCFloat)
    public attack:number=25;            //攻击力
    @property(CCFloat)
    public cdTime:number =0.25;         //间隔s
    @property(CCFloat)
    public movementSpeedMin:number=4;   //移动速度min
    @property(CCFloat)
    public movementSpeedMzx:number=7;   //移动速度max
    
    
    public ZombiesState:ZombiesState=ZombiesState.Disable;      //僵尸状态
    public actState:ZombiesAct;                                 //僵尸行动
    private cellPlant:Node = null;                                    //被攻击的植物对象
    start() {
        if(MouseManager.Instance.gameState == GameState.Afoot){
            this.ZombiesState = ZombiesState.Enable;
        }
        if(this.cellPlant!= null && [ZombiesAct.Move,ZombiesAct.LostHeadMove].indexOf(this.actState)){
            this.cellPlant = null
        }

    }

    update(deltaTime: number) {
        
        if(MouseManager.Instance.gameState == GameState.Suspend){
            this.ZombiesState = ZombiesState.Disable;
        }
    }

    //判断位置格子是否有植物
    thisCellHavePlant(num:number):boolean{
        let cellArray = this.node.parent.parent.getChildByName('Plant').children
        
        for (let plantNode of cellArray) {
            if(plantNode.position.x<num && num<plantNode.position.x+95){
                this.actState = ZombiesAct.Eat;
                this.cellPlant =plantNode
                return true;
            }
        }
        return false;
    }

    eatPlant(){
        if(this.thisCellHavePlant(this.node.position.x+50)){
            this.cellPlant.getComponent(Plant).PlantHP-=this.attack;
        }else{
            this.actState =ZombiesAct.Move
        }
        
    }
    //死亡删除节点
    isDie(){
        this.node.destroy()
    }
    //HP变化
    HPChange(num:number){
        if(this.ZombiesState == ZombiesState.HPEnd){
            if(this.LingHp+num>0){
                this.LingHp+=num
            }else{
                this.ZombiesState =ZombiesState.Die;
                this.actState = ZombiesAct.Die;
            }
            return;
        }
        this.HPnum+=num;
        if(this.HPnum<=0){
            this.ZombiesState = ZombiesState.HPEnd;
           
            if( this.actState == ZombiesAct.Move){
                this.actState =ZombiesAct.LostHeadMove;
            }
            if( this.actState == ZombiesAct.Eat){
                this.actState =ZombiesAct.LostHeadEat;
            }
           
        }  
    }
}


