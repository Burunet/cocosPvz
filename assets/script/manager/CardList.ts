import { _decorator, Component, Label, Node } from 'cc';
import { MouseManager } from './MouseManager';
import { GameState } from './Global';
const { ccclass, property } = _decorator;


//游戏开始后 -- Card UI 加载控制
@ccclass('CardList')
export class CardList extends Component {
    //卡槽状态 
    private staticState:string = 'Disable';
    
    @property({type:Label,tooltip:'阳光值UI'})
    private sunPointLabel:Label = null;

    start() {
        let position = this.node.position
        this.node.setPosition(position.x,position.y+100,0)
    }

    //下降
    startInit(num:number = 50){
        if(MouseManager.Instance.gameState != GameState.Afoot) return;
        setTimeout(() => {
            let position = this.node.position
            this.node.setPosition(position.x,position.y-2,0)
            let newNum = num-1;
            if(num>0){
                this.startInit(newNum)
            }
        }, 10);
    }

    //修改ui阳光值
    updateSunPointLabel(num:any):void{
        this.sunPointLabel.string = num;
    }
}


