import { _decorator, Component, Enum, Node, Sprite } from 'cc';
import {CardState,PlantType} from './manager/Global';
import { GlobalManager } from './manager/GlobalManager';
import { MouseManager } from './manager/MouseManager';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
    //卡片状态
    private cardState:CardState = CardState.Cooling;
    
    @property({type:Enum(PlantType)})
    public PlantType:PlantType;  //卡牌类型 --植物
    @property(Node)
    public cardLight: Node = null; //亮
    @property(Node)
    public cardGrey: Node = null; //暗
    @property(Sprite)
    public cardMask: Sprite = null; //遮罩层

    @property({type:Number,tooltip:'卡牌冷却时间'})
    public cdTime:number = 5;  //卡牌冷却时间
    private cdTimer:number;  //卡牌冷却计时

    @property({type:Number,tooltip:'植物需要的阳光点数'})
    private needSunPoint:number =150;  //需要的阳光值

    start() {
        this.changeState(this.cardState)
    }

    update(deltaTime: number) {
        switch (this.cardState) {
            case CardState.Cooling:
                this.coolingUpdate(deltaTime);
                break;
            case CardState.WaitingSun:
                this.waitingSunUpdate
                break;
            case CardState.Ready:
                this.readyUpdate
                break;
        }
    }
    coolingUpdate(dt:number){
        this.cdTimer-=dt;
        this.cardMask.fillRange=-(this.cdTimer/this.cdTime);
        if(this.cdTimer<=0){  // 冷却结束判断阳光
            this.changeState(GlobalManager.Instance.SunPoint>=this.needSunPoint?CardState.Ready:CardState.WaitingSun)
        }
    }
    waitingSunUpdate(){
        this.changeState(GlobalManager.Instance.SunPoint>=this.needSunPoint?CardState.Ready:CardState.WaitingSun)
    }

    readyUpdate(){
        this.changeState(GlobalManager.Instance.SunPoint>=this.needSunPoint?CardState.Ready:CardState.WaitingSun)
    }
    //修改卡牌状态
    changeState(state:CardState){
        switch (state) {
            case CardState.Cooling:
                this.cardLight.active = false;
                this.cardGrey.active = true;
                this.cdTimer = this.cdTime;
                break;
            case CardState.WaitingSun:
                this.cardLight.active = false;
                this.cardGrey.active = true;
                break;
            case CardState.Ready:
                this.cardLight.active = true;
                this.cardGrey.active = false;
                break;
        }
    }
    //点击了卡片开始种植物
    AtClick(){
        console.log('点击浏览');
        MouseManager.Instance.addPlant(this.PlantType);
        if(GlobalManager.Instance.subSun(-this.needSunPoint)){
            this.changeState(CardState.Cooling)
        }
    }
}


