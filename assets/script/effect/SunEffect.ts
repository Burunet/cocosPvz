import { _decorator, Component, Animation, find, Vec3, AudioSource } from 'cc';
import {SunState} from '../manager/Global'
import { GlobalManager } from '../manager/GlobalManager';
const { ccclass, property } = _decorator;

@ccclass('SunEffect')
export class SunEffect extends Component {
    //初始阳光状态
    public sunState:SunState = SunState.Enable;
    private endPosition:any; //点击阳光后阳光要飘去的位置
    private moveX:number=0;
    private moveY:number=0;
    private addSun:number =25  //该阳光加的阳光数

    // @property(AudioSource)
    // public audioSource: AudioSource | null = null;
    start() {

    }

    update(deltaTime: number) {
        if(this.sunState ==SunState.Disable && this.endPosition!=null){
            // y+ x-
            let oldPosition = this.node.position;
            let newPosition = new Vec3(oldPosition.x-this.moveX,oldPosition.y+this.moveY,0);
            
            if(oldPosition.x >= this.endPosition.x+10){
                newPosition = new Vec3(oldPosition.x-this.moveX,oldPosition.y+this.moveY,0);
            }else if(oldPosition.x <= this.endPosition.x-10){
                newPosition = new Vec3(oldPosition.x+this.moveX,oldPosition.y+this.moveY,0);
                this.node.setPosition(newPosition)
            }
            this.node.setPosition(newPosition)
            
            if(newPosition.x < this.endPosition.x+50 && newPosition.x>this.endPosition.x-50 && newPosition.y > this.endPosition.y){
                GlobalManager.Instance.subSun(this.addSun);
                this.node.destroy()
            }

        }
    }
    //阳光点击事件
    SunOnClick(){

        if(this.sunState ==SunState.Disable) return;
        this.sunState = SunState.Disable;
        let sunPintLabelP  = find('Canvas/Manager/CardList');
        let sunPintLabel  = find('Canvas/Manager/CardList/sunPintLabel');
        let position=this.node.position;
        this.endPosition = new Vec3(sunPintLabel.position.x,sunPintLabelP.position.y-50,0);
        this.moveX = Math.abs(position.x-this.endPosition.x)/30
        this.moveY = Math.abs(position.y-this.endPosition.y)/30
        // 播放音效
        this.node.getComponent(AudioSource).play()
    }

    // playSound() {
    //     if (this.audioSource) {
    //         this.audioSource.play();
    //     }
    // }
    //阳光动画切换--通过
    changeState(){
        let animation = this.getComponent(Animation);
        let state = animation.getState('Sunflower_Sun');
        let newState = animation.getState('SunAnimation');
        // 停止当前动画
        state.stop();
        // 开始新动画
        newState.play();
    }
    lastAnimation(){
        let animation = this.getComponent(Animation);
        let newState = animation.getState('SunAnimation');
        // 开始新动画
        newState.play();
    }
}


