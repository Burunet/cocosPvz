import { _decorator, Component, Animation, Node, Vec3, log } from 'cc';
import { ZombiesAct, ZombiesState } from '../manager/Global';
import { Zombies } from './Zombies';
import { Plant } from '../Plant';
const { ccclass, property } = _decorator;

@ccclass('ZombiesOne')
export class ZombiesOne extends Component {

    private oldAct:ZombiesAct=null;  //前一次的状态
    private stopTime:number=0;       //停止时的动画时间
    private atLing:boolean = true;
   
    start() {
    }

    update(deltaTime: number) {
        
        if(this.node.getComponent(Zombies).ZombiesState!=ZombiesState.Disable){  //僵尸是否是未激活
            
            if(this.node.getComponent(Zombies).actState != this.oldAct){
                
                this.oldAct = this.node.getComponent(Zombies).actState;

                
                this.AnimationCtrl(this.node.getComponent(Zombies).actState)
                
            }
        }
        if(this.node.getComponent(Zombies).ZombiesState == ZombiesState.HPEnd && this.atLing){
            this.atLing =false;
            let time = ()=>{setTimeout(()=>{
                this.node.getComponent(Zombies).HPChange(-60)
                if(this.node.getComponent(Zombies).LingHp>0){
                    time();
                }
            },1000)}
        }
        if(this.node.getComponent(Zombies).ZombiesState == ZombiesState.HPEnd && this.node.getComponent(Zombies).LingHp<=0){
            this.node.getComponent(Zombies).actState = ZombiesAct.Die
        }

    }

    //动画切换控制器
    AnimationCtrl(state:ZombiesAct){

        let animation = this.getComponent(Animation);
        let Move         = animation.getState('ZombiesMoveOne');
        let Eat          = animation.getState('ZombiesEat');
        let LostHeadMove = animation.getState('ZombiesMoveLostHead');
        let LostHeadEat  = animation.getState('ZombiesEatLost');
        let Die          = animation.getState('ZombiesDie');
        let BormDie      = animation.getState('ZombiesBorm');
        let BackDie      = animation.getState('ZombiesBack');
        Move.stop();Eat.stop();LostHeadMove.stop();LostHeadEat.stop();
        switch (state) {
            case ZombiesAct.Move:
                Move.play()
                break;
            case ZombiesAct.Eat:
                Eat.play()
                break; 
            case ZombiesAct.LostHeadMove:
                LostHeadMove.play()
                break;
            case ZombiesAct.LostHeadEat:
                LostHeadEat.play()
                break;
            case ZombiesAct.Die:
                Die.play()
                break;
            case ZombiesAct.BormDie:
                BormDie.play()
                break;
            case ZombiesAct.BackDie:
                BackDie.play()
                break;
            
        }
    }
    //完整移动
    startMove(){
        let oldPosition = this.node.position;
        let newPosition = new Vec3(oldPosition.x-1,oldPosition.y,0)
        this.node.setPosition(newPosition)

        let biaobian= newPosition.x+50  //判断这个位置的格子
        this.node.getComponent(Zombies).thisCellHavePlant(biaobian)  //判断这个位置的格子是否有植物 有则切换到eat
        
    }
    //断头移动
    stopHeadMove(){
        let oldPosition = this.node.position;
        let newPosition = new Vec3(oldPosition.x-0.8,oldPosition.y,0)
        this.node.setPosition(newPosition)
    }



}


