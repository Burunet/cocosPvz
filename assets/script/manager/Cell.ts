import { _decorator, AudioSource, Component, EventMouse, log, Node } from 'cc';
import { MouseManager } from './MouseManager';
import { CellState } from './Global';

const { ccclass, property } = _decorator;

@ccclass('Cell')
export class Cell extends Component {

    @property(AudioSource)
    public audioSource: AudioSource | null = null;
    //格子状态
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
        MouseManager.Instance.onCellClick(this)
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


