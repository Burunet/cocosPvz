import { _decorator, Component, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CardListManager')
export class CardListManager extends Component {
    private static _instance: CardListManager =null;
    
    //被选定的卡组
    public checkCardList:Array<Prefab>=[];
    public checkCardListB:Array<Node>=[];
    public checkCardPosition:Array<any>=[
        new Vec3(-157,-8,0),
        new Vec3(-102,-8,0),
        new Vec3(-47,-8,0),
        new Vec3(8,-8,0),
        new Vec3(63,-8,0),
        new Vec3(118,-8,0),
        new Vec3(173,-8,0),
        new Vec3(228,-8,0),
    ];
    public checkCardPositionA:Array<any>= [//准备阶段选卡位置的
        new Vec3(-435,305,0),
        new Vec3(-365,305,0),
        new Vec3(-295,305,0),
        new Vec3(-225,305,0),
        new Vec3(-155,305,0),
        new Vec3(-85,305,0),
        new Vec3(-15,305,0),
        new Vec3(55,305,0),
    ]; //游戏阶段选卡位置的
    start() {

    }

    update(deltaTime: number) {
        
    }



     //生命周期 初始化 onload 
     protected onLoad(): void {
        //全局只充存着一个
        if(CardListManager._instance == null){
            CardListManager._instance = this;
        }else{
            this.node.destroy();
            return;
        }
    }
     //获取实例
     public static get Instance():CardListManager{
        return this._instance;
    }
}


