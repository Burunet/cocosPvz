import { _decorator, Animation, Component, Enum, find, instantiate, log, Node, Prefab, Vec3 } from 'cc';
import { PlantType,PlantState, SunState } from '../manager/Global';
import { Plant } from '../Plant';
import { SunEffect } from '../effect/SunEffect';
const { ccclass, property } = _decorator;

@ccclass('Sunflower')
export class Sunflower extends Component {
    @property({type:Prefab,tooltip:'阳光动画'})
    sunPrefab:Prefab =null;

    //植物父级脚本
    private plant:Plant;

    //第一次生产 状态  //向日葵第一次生产时间为3-12.5  其他时间为23.5-25
    private fistState:boolean = true;
    start() {
        this.plant= this.getComponent(Plant);
    }

    update(deltaTime: number) {
        switch (this.plant.plantState) {
            case PlantState.Enable:  //激活状态执行
                if(this.fistState){
                    // Math.random() * (max - min) + min;
                    this.plant.plantStart(Math.random() * (12.5 - 2) + 2);
                    this.fistState = false;
                }
                this.plant.cdTime -=deltaTime;
                
                if(this.plant.cdTime<=0){
                    //转到待生产
                    this.plant.transitionToEnableHodel();
                }
                break;
            case PlantState.EnableHodel:  //待生产状态执行
                this.enableHodel();
                break;
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
        //1.5秒出阳光
        setTimeout(()=>{
            this.SunCreate()
            //一秒变回来 切动画
            setTimeout(()=>{
                this.midAnimationDecisionEnd()
            },1000)
        },1500)
        
    }
    //发光动画切换回黑暗动画
    midAnimationDecisionEnd(){
        //转回动画
        let animation = this.getComponent(Animation);
        let newState = animation.getState('SunflowerOn');
        let state = animation.getState('Sunflower_Glowing');
        newState.time = state.time
        state.stop();
        newState.play();
    }

   //阳光生产
    SunCreate(){
        //阳光预制体不存在则不进行接下来的操作
        if(this.sunPrefab == null)return;
        
        let sun = instantiate(this.sunPrefab);  //实例化阳光
        sun.parent = find('Canvas/ForeGround'); //设置阳光父节点
        let sunScript = sun.getComponent(SunEffect);  //取得阳光脚本

        let SunPosition =this.node.parent.position; //取得当前植物格子的位置
        //以植物位置来创建阳光-阳光生成的初始位置
        let newSunPosition = new Vec3(SunPosition.x+10,SunPosition.y -50,0);
        sun.setPosition(newSunPosition);

         //转回激活状态 重置生产等待时间
         this.plant.plantState=PlantState.Enable;
         this.plant.plantStart();

        //阳光产生的动画
        this.SunDown(sun,newSunPosition.y -2,newSunPosition.y -20,newSunPosition.x+1,newSunPosition.x+30,sunScript);

        //向日葵 产生阳光  4s  无操作则删除节点
        setTimeout(() => {
            
            if(sun!==null && sunScript.sunState ==SunState.Enable){
                if(true){ //开了自动收集阳光
                    sunScript.SunOnClick();
                }else{
                   sun.destroy(); //销毁节点 
                }
            }
        }, 4000);
        
    }
    /**
     * //阳光 下落 + 向右
     * @param sun  阳光预设体
     * @param y     新的y值
     * @param atY   预定到达的y
     * @param x     新的y值
     * @param atX   新的y值
     * @param sunScript 阳光脚本
     */
    SunDown(sun:Node,y:number,atY:number,x:number,atX:number,sunScript:SunEffect){
        setTimeout(()=>{
            //当状态或位置到达预定位置时结束
            if(y<=atY || sunScript.sunState == SunState.Disable)return;
            let newSunPosition = new Vec3(x,y,0);
            sun.setPosition(newSunPosition)
            if(x>=atX){
                this.SunDown(sun,y-2,atY,x,atX,sunScript);
            }else{
                this.SunDown(sun,y-2,atY,x+1,atX,sunScript);
            }
        },100);
    }
}


