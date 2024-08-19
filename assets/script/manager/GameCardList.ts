import { _decorator, Component, Node } from 'cc';
import { MouseManager } from './MouseManager';
const { ccclass, property } = _decorator;

//gameCardList 脚本
@ccclass('GameCardList')
export class GameCardList extends Component {
    start() {
        MouseManager.Instance.ReadyAudio(2);
    }

    update(deltaTime: number) {
        
    }
    //开始游戏
    gameStart(){
        this.node.destroy();
        //转到加载中
        MouseManager.Instance.transitionToLoading()
    }
}


