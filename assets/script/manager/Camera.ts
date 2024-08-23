import { _decorator, Component, Node, Vec3 } from 'cc';
import { MouseManager } from './MouseManager';
const { ccclass, property } = _decorator;

//摄像头脚本
@ccclass('Camera')
export class Camera extends Component {
    public state:boolean = false;
    private moveNum:number = 370;
    private oldPosition:any;
    protected start(): void {
        this.oldPosition = this.node.position;
        let newPosition = new Vec3(this.oldPosition.x+this.moveNum, this.oldPosition.y, 0);
        this.node.setPosition(newPosition); 
        // this.state=true;
    }
    protected update(dt: number): void {
        if(this.state){
            this.moveNum-=4
            let oldPosition = this.node.position;
            let newPosition = new Vec3(this.moveNum, oldPosition.y, 0);
            this.node.setPosition(newPosition);
            //摄像头到达预定位置
            if(this.moveNum<=0){
                this.state=false;
                setTimeout(()=>{
                    MouseManager.Instance.toLoading();
                },1000)
               
            }
        }
    }
    //将摄像机位置摆正
    onMovetoAction(){
        let newPosition = new Vec3(this.node.position.x-this.moveNum, this.node.position.y, 0);
        this.node.setPosition(newPosition); 
    }

}


