import { _decorator, Animation, Component, Enum, Node } from 'cc';
import { PlantType,PlantState } from './manager/Global';
const { ccclass, property } = _decorator;

//植物脚本

@ccclass('Plant')
export class Plant extends Component {

    plantState: PlantState = PlantState.Disable;

    @property({type:Enum(PlantType)})
    public PlantType:PlantType;  //卡牌类型 --植物

    @property({type:Number,tooltip:'生效间隔 +1s动画时间'})
    public PlantTime:number = 5;

    private cdTime;  //生效计时

    start() {
        this.plantStart();; //初始化
        this.transitionToDisable()
    }

    update(deltaTime: number) {
        switch (this.plantState) {
            case PlantState.Enable:
                this.enableUpdate(deltaTime);
                break;
        }
    }

    disableUpdate(){
    }
    //激活状态执行
    enableUpdate(time:number){
        this.cdTime -=time;
        if(this.cdTime<=0){
            this.plantState=PlantState.EnableHodel;
        }
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
    //转到生产
    transitionToEnableHodel(){

    }
    

    plantStart(){
        this.cdTime = this.PlantTime;
    }

}



