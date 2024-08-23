import { _decorator, Animation, CCFloat, Component, Enum, Node } from 'cc';
import { PlantType,PlantState, CellState } from './manager/Global';
import { Cell } from './Game/Cell';
const { ccclass, property } = _decorator;

//植物脚本

@ccclass('Plant')
export class Plant extends Component {

    plantState: PlantState = PlantState.Disable;

    @property({type:Enum(PlantType)})
    public PlantType:PlantType;  //卡牌类型 --植物

    @property({type: CCFloat,tooltip:'生效间隔min'})
    public PlantTimeMin:number = 5;
    @property({type: CCFloat,tooltip:'生效间隔max'})
    public PlantTimeMax:number = 10;
    

    @property({type: CCFloat,tooltip:'HP'})
    public PlantHP:number = 300;

    public cdTime:number;  //生效计时
    public CellName:string;

    start() {
        this.plantStart();; //初始化
        this.transitionToDisable()
    }
    protected update(dt: number): void {
        if(this.PlantHP<=0){  //监听植物血量
            this.node.parent.parent.getChildByName(this.CellName).getComponent(Cell).changeCellState(CellState.None)
            this.node.destroy();
        }
    }

    // 转到未激活
    transitionToDisable(){
        this.plantState=PlantState.Disable;
        this.getComponent(Animation).enabled = false;
    }
    //转到激活
    transitionToEnable(){
        this.plantState=PlantState.Enable;
        this.getComponent(Animation).enabled = true;
    }
    //转到 待生产
    transitionToEnableHodel(){
        this.plantState = PlantState.EnableHodel
    }
    
    //重置作用cd
    plantStart(time:number=0){
        if(this.PlantTimeMax - this.PlantTimeMin>0){
            this.cdTime = time==0? Math.random() * (this.PlantTimeMax - this.PlantTimeMin)+ this.PlantTimeMin:time;
        }else{
            this.cdTime = time==0?this.PlantTimeMin:time;
        }
        
    }

}



