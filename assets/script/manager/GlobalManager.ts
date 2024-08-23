import { _decorator, Component, find, instantiate, Prefab ,Node, CCFloat } from 'cc';
import { CardList } from './CardList/CardList';
import { MouseManager } from './MouseManager';
const { ccclass, property } = _decorator;

@ccclass('GlobalManager')
export class GlobalManager extends Component {

    private static _instance: GlobalManager =null;

    //阳光值
    @property({type:CCFloat,tooltip:'阳光值'})
    private sunPoint:number = 0;

    private cardList:Node;
    //卡槽预设
    @property(Prefab)
    public cardListPrefab:Prefab;
    
    @property(Prefab)//选卡界面预设
    public gameCardList:Prefab;

    //获取实例
    public static get Instance():GlobalManager{
        return this._instance;
    }
    //生命周期 初始化 onload 
    protected onLoad(): void {
        //全局只充存着一个
        if(GlobalManager._instance == null){
            GlobalManager._instance = this;
        }else{
            this.node.destroy();
            return;
        }
    }
    protected start(): void {
        //进入选卡--游戏开始操作
        let gameCardList = instantiate(this.gameCardList);
        gameCardList.parent = this.node;
    }

     //公共访问器： 阳光的获取
     public get  SunPoint() : number {
        return this.sunPoint;
    }
    //创建选卡
    creatCardList(){
        this.cardList = instantiate(this.cardListPrefab);
        this.cardList.parent = this.node;
        let cardListScript = this.cardList.getComponent(CardList)
        cardListScript.updateSunPointLabel(this.sunPoint)
        cardListScript.startInit();
    }


    //阳光的加减
    public subSun(point:number):boolean{
        if(this.sunPoint+point<0)return false;
        this.sunPoint+=point;
        this.cardList.getComponent(CardList).updateSunPointLabel(this.sunPoint)
        return true;

    }
}


