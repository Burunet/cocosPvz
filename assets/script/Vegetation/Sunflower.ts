import { _decorator, Animation, Component, Enum, find, instantiate, log, Node, Prefab, Vec3 } from 'cc';
import { PlantType,PlantState } from '../manager/Global';
import { Plant } from '../Plant';
const { ccclass, property } = _decorator;

@ccclass('Sunflower')
export class Sunflower extends Component {
    @property({type:Prefab,tooltip:'阳光动画'})
    sunPrefab:Prefab =null;

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
        //1秒出阳光
        setTimeout(()=>{
            this.SunCreate()
        },1200)
        //一秒变回来
        setTimeout(()=>{
            this.midAnimationDecisionEnd()
        },2000)
    }
    //生产结束 转回激活
    midAnimationDecisionEnd(){
        //转回动画
        let animation = this.getComponent(Animation);
        let newState = animation.getState('SunflowerOn');
        let state = animation.getState('Sunflower_Glowing');
        newState.time = state.time
        state.stop();
        newState.play();
        //转回激活状态 重置生产等待时间
        this.plant.plantState=PlantState.Enable;
        this.plant.plantStart();
    }

   //阳光生产
    SunCreate(){
        if(this.sunPrefab == null)return;
        let wz = this.node.position;
        let sun = instantiate(this.sunPrefab);
        sun.parent = find('Canvas/ForeGround');
        
        // sun.setPosition(this.node.position);

        let SunPosition =this.node.position;
        let newSunPosition = new Vec3(SunPosition.x+10,SunPosition.y -10,0);
        sun.setPosition(newSunPosition);
        this.SunDown(sun,SunPosition.y -2,SunPosition.y -50,SunPosition.x+1,SunPosition.x+20);
        console.log('Sun position'+wz);
        setTimeout(() => {
            sun.destroy();
        }, 4000);
        
    }
    //阳光 下落 + 向右
    SunDown(sun:Node,y:number,atY:number,x:number,atX:number){
        setTimeout(()=>{
            if(y<=atY)return;
            let SunPosition =sun.position;
            let newSunPosition = new Vec3(SunPosition.x,y,0);
            sun.setPosition(newSunPosition)
            if(x>=atX){
                this.SunDown(sun,y-2,atY,x,atX);
            }else{
                this.SunDown(sun,y-2,atY,x+1,atX);
            }
            

        },100);
    }
}


