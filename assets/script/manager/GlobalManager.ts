import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GlobalManager')
export class GlobalManager extends Component {

    private static _instance: GlobalManager =null;

    //阳光值
    @property({type:Number,tooltip:'阳光值'})
    private sunPoint:number = 0;

    @property({type:Label,tooltip:'阳光值UI'})
    private sunPointLabel:Label = null;

    //获取实例
    public static get Instance():GlobalManager{
        return this._instance;
    }
    //生命周期 初始化 onload 
    protected onLoad(): void {
        //全局只充存着一个
        if(GlobalManager._instance == null){
            GlobalManager._instance = this;
        }else{
            this.node.destroy();
            return;
        }
    }
     //公共访问器： 阳光的获取
     public get  SunPoint() : number {
        return this.sunPoint;
    }
    start() {
        this.updateSunPointLabel()
    }
    //修改ui阳光值
    updateSunPointLabel():void{
        this.sunPointLabel.string = this.sunPoint.toString();
    }

    //阳光的加减
    public subSun(point:number):boolean{
        if(this.sunPoint-point<0)return false;
        this.sunPoint+=point;
        this.updateSunPointLabel()
        return true;

    }
}


