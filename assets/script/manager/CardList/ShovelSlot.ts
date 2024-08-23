import { _decorator, AudioSource, Component, EventMouse, find, instantiate, Prefab } from 'cc';
import { MouseManager } from '../MouseManager';
const { ccclass, property } = _decorator;

@ccclass('ShovelSlot')
export class ShovelSlot extends Component {
    @property({type:Prefab,tooltip:'铲子预制体'})
    public Shovel:Prefab = null; 

    onClick(event:EventMouse){
        if(this.Shovel == null)return;
        if(MouseManager.Instance.currentPlant!=null){
            MouseManager.Instance.currentPlant.destroy()
            MouseManager.Instance.onFund()
        }else{
            let shovelNode = instantiate(this.Shovel);
            shovelNode.parent = find('Canvas/ForeGround')
            MouseManager.Instance.currentPlant = shovelNode;
            MouseManager.Instance.followCursor(event)
            this.node.getComponent(AudioSource).play();
        }
        
    }
}


