import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ManagerGameCardLisrCard')
export class ManagerGameCardLisrCard extends Component {

    @property([Prefab])
    private cardListCard:Prefab[] = [];

    start() {
        for(let cardPrefab of this.cardListCard){
            let cardNode=instantiate(cardPrefab) 
            cardNode.parent = this.node;
        }
    }

    update(deltaTime: number) {
        
    }
}


