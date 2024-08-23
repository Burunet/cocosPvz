import { _decorator, Component, find, instantiate, Node, Prefab, Vec3 } from 'cc';
import { PlantType } from '../../manager/Global';
import { CardListManager } from '../../manager/CardListManager';
const { ccclass, property } = _decorator;


//选卡界面卡牌
@ccclass('CardListCard')
export class CardListCard extends Component {

    @property({type:PlantType,tooltip:'植物类型'})
    public plantType:PlantType;

    @property(Node)
    public cardLight: Node = null; //亮
    @property(Node)
    public cardGrey: Node = null; //暗

    @property(Prefab)
    public CardPrefab:Prefab

    //植物卡牌
    private thisParent:CardListCard=null

    start() {

    }

    update(deltaTime: number) {
        
    }
    //卡牌点击事件
    onClick(){
        if(this.thisParent!=null){
            this.thisParent.getComponent(CardListCard).cardLight.active=true;
            let NoCard =CardListManager.Instance.checkCardList.indexOf(this.CardPrefab)
            CardListManager.Instance.checkCardList.splice(NoCard,1)
            CardListManager.Instance.checkCardListB.splice(NoCard,1)
            for (let element of  CardListManager.Instance.checkCardListB) {
                element.setPosition(CardListManager.Instance.checkCardPositionA[ CardListManager.Instance.checkCardListB.indexOf(element)])
            }
            this.node.destroy()
        }else if( this.cardLight.active){
            CardListManager.Instance.checkCardList.push(this.CardPrefab);
            let newNode = instantiate(this.node);

            CardListManager.Instance.checkCardListB.push(newNode);
            newNode.parent = this.node.parent.parent.parent;
            newNode.getComponent(CardListCard).setParent(this);
            newNode.setPosition( CardListManager.Instance.checkCardPositionA[ CardListManager.Instance.checkCardListB.indexOf(newNode)]);
            
            this.cardLight.active=false; 
        }
    }
    setParent(node:CardListCard){
        this.thisParent = node;
    }
}


