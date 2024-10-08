import { _decorator, AudioSource, Component, Enum, EventMouse, find, log, Node } from 'cc';
import { MouseManager } from '../manager/MouseManager';
import { CellState } from '../manager/Global';

const { ccclass, property } = _decorator;

@ccclass('Cell')
export class Cell extends Component {

    @property(AudioSource)
    public audioSource: AudioSource | null = null;

    //格子状态
    @property({type:Enum(CellState)})
    private cellState:CellState=CellState.None;

    protected onLoad(): void {
        this.node.on(Node.EventType.MOUSE_DOWN,this.OnMouseDown,this)
        this.node.on(Node.EventType.MOUSE_MOVE,this.onMouseMove,this)
    }
    protected onDestroy(): void {
        this.node.off(Node.EventType.MOUSE_DOWN,this.OnMouseDown,this)
        this.node.off(Node.EventType.MOUSE_MOVE,this.onMouseMove,this)
    }

    OnMouseDown(event:EventMouse){
        if(MouseManager.Instance.currentPlant==null)return; //不存在植物实体
        if(MouseManager.Instance.currentPlant.name == 'shovel'){
            let mousePos = event.getUILocation(); //鼠标位置
            let plantArray =  this.node.parent.getChildByName('Plant').children;
            
            for (let plant of plantArray) {
                if(plant.position.x == this.node.position.x){
                    plant.destroy();
                    this.cellState = CellState.None;
                    MouseManager.Instance.currentPlant.destroy()
                    MouseManager.Instance.onFund()
                    break;
                }
            }
        }else{
            MouseManager.Instance.onCellClick(this)
        }
        
    }

    onMouseMove(event:EventMouse){
        MouseManager.Instance.followCursor(event)
    }
    nowCellState():boolean{
        switch (this.cellState) {
            case CellState.None:
                return false;
            case CellState.Have:
                return true;  
            default:
                return true;
        }
    }
    changeCellState(state:CellState){
        this.cellState = state;
    }
}


