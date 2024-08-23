import { _decorator, Component, Node } from 'cc';
import { MouseManager } from '../manager/MouseManager';
import { GameState, ZombiesState } from '../manager/Global';
import { Zombies } from '../Zombies/Zombies';
const { ccclass, property } = _decorator;


//每一行的脚本 --检测是否有僵尸在本行 
@ccclass('Hang')
export class Hang extends Component {

    public HaveZombies:boolean = false;  //路线上是否有僵尸
    start() {

    }

    update(deltaTime: number) {
        //游戏状态为进行中时才进行检测
        if(MouseManager.Instance.gameState == GameState.Afoot){
            let entyZom:Node[] = [];
            let Zombieshead = this.node.getChildByName('Zombieshead').children;
            for (let zombie of Zombieshead) {
                if([ZombiesState.Die,ZombiesState.HPEndT,ZombiesState. Disable].indexOf(zombie.getComponent(Zombies).ZombiesState) == -1 ){
                    entyZom.push(zombie)
                }
                
            }
            this.HaveZombies = entyZom.length>0;
        }
    }
}


