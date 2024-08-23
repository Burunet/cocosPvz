import { _decorator, Component, Node } from 'cc';
import { loading } from './loading';
const { ccclass, property } = _decorator;

@ccclass('useGame')
export class useGame extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    UseGameOnClick(){
        console.log('进游戏了');
        loading.Instance.onClick()
    }
}


