import { _decorator, Component, Enum, Node } from 'cc';
import { PlantType,PlantState } from './manager/Global';
const { ccclass, property } = _decorator;

//植物脚本



@ccclass('Plant')
export class Plant extends Component {

    PlantState: PlantState = PlantState.Disable;

    @property({type:Enum(PlantType)})
    public PlantType:PlantType;  //卡牌类型 --植物

    start() {

    }

    update(deltaTime: number) {
        switch (this.PlantState) {
            case PlantState.Disable:
                this.disableUpdate();
                break;
            case PlantState.Enable:
                this.enableUpdate();
                break;
        }
    }

    disableUpdate(){
    }
    enableUpdate(){

    }
}



