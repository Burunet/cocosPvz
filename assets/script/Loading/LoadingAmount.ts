import { _decorator, Component, log, Node, Sprite } from 'cc';
import { loading } from './loading';
const { ccclass, property } = _decorator;

@ccclass('LoadingAmount')
export class LoadingAmount extends Component {
    public startStatu:boolean = true
    public tokeDMax:number = 0.34;

    @property(Sprite)
    private LoabBarGrass:Sprite = null;

    update(deltaTime: number) {
        
     if( this.tokeDMax>this.LoabBarGrass.fillRange){
        this.LoabBarGrass.fillRange = this.LoabBarGrass.fillRange+0.01;
        
        if(this.LoabBarGrass.fillRange>=1){
            loading.Instance.createClick()
            this.node.destroy();
            
        }
     }else if(this.startStatu){
        this.startStatu = false;
        loading.Instance.onLoadScence()
    } 
    }
}


