import { _decorator, Component, find, instantiate, Label, Node } from 'cc';
import { MouseManager } from '../MouseManager';
import { GameState } from '../Global';
import { CardListManager } from '../CardListManager';
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
            }else{
                 // 建卡
                 for (let cardList of CardListManager.Instance.checkCardList) {
                    let newNode = instantiate(cardList);
                    newNode.parent = find('Canvas/Manager/CardList/ChooserBackground');
                    newNode.setPosition(CardListManager.Instance.checkCardPosition[ CardListManager.Instance.checkCardList.indexOf(cardList)])
                }
            }
        }, 10);
    }
    //修改ui阳光值
    updateSunPointLabel(num:any):void{
        this.sunPointLabel.string = num;
    }
}


