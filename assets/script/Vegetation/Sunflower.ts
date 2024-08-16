import { _decorator, Animation, Component, Enum, log, Node } from 'cc';
import { PlantType,PlantState } from '../manager/Global';
import { Plant } from '../Plant';
const { ccclass, property } = _decorator;

@ccclass('Sunflower')
export class Sunflower extends Component {
    
    private plant:Plant;
    start() {
        this.plant= this.getComponent(Plant);
    }

    update(deltaTime: number) {
    
        if(this.plant.plantState == PlantState.EnableHodel){
            this.enableHodel();
        }
    }

    // 动画效果 处理转到生产动画
    enableHodel() {
        this.plant.plantState=PlantState.EnableIng;
        let animation = this.getComponent(Animation);
        let state = animation.getState('SunflowerOn');
        let time = state.time;

        // 停止当前动画
        state.stop();
        // animation.play('Sunflower_Glowing')
        // 开始新动画
        let newState = animation.getState('Sunflower_Glowing');

        // 设置新动画的时间
        newState.time = time;
        newState.play();
    }
    //生产结束 转回激活
    midAnimationDecisionEnd(){
        //转回动画
        let animation = this.getComponent(Animation);
        let newState = animation.getState('SunflowerOn');
        let state = animation.getState('Sunflower_Glowing');
        state.stop();
        newState.play();
        //转回激活状态 重置生产等待时间
        this.plant.plantState=PlantState.Enable;
        this.plant.plantStart();
    }
}


