import { _decorator, Animation, Component, Enum, Node } from 'cc';
import { PlantType,PlantState } from './manager/Global';
const { ccclass, property } = _decorator;

//植物脚本

@ccclass('Plant')
export class Plant extends Component {

    plantState: PlantState = PlantState.Disable;

    @property({type:Enum(PlantType)})
    public PlantType:PlantType;  //卡牌类型 --植物

    @property({type:Number,tooltip:'生效间隔min'})
    public PlantTimeMin:number = 5;
    @property({type:Number,tooltip:'生效间隔max'})
    public PlantTimeMax:number = 10;

    @property({type:Number,tooltip:'HP'})
    public PlantHP:number = 300;

    public cdTime;  //生效计时

    start() {
        this.plantStart();; //初始化
        this.transitionToDisable()
    }

    // 转到未激活
    transitionToDisable(){
        this.plantState=PlantState.Disable;
        this.getComponent(Animation).enabled = false;
    }
    //转到激活
    transitionToEnable(){
        this.plantState=PlantState.Enable;
        this.getComponent(Animation).enabled = true;
    }
    //转到 待生产
    transitionToEnableHodel(){
        this.plantState = PlantState.EnableHodel
    }
    
    //重置作用cd
    plantStart(time:number=0){
        this.cdTime = time==0?Math.random() * (this.PlantTimeMax - this.PlantTimeMin) + this.PlantTimeMin:time;
    }

}



