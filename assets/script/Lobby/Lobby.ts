import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Lobby')
export class Lobby extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    useAdventure(){
        director.loadScene('Game')
    }

}


