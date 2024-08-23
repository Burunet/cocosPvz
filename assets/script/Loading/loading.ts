import { _decorator, Component, director, instantiate, Node, Prefab, Sprite } from 'cc';
import { LoadingAmount } from './LoadingAmount';
const { ccclass, property } = _decorator;

//场景1 的预制脚本
@ccclass('loading')
export class loading extends Component {
    private static _instance: loading =null;

    @property(Sprite)
    public backgroundMask: Sprite = null; //遮罩层
    @property(Prefab)
    private clickNode:Prefab;
    @property(Prefab)
    private Amount:Prefab;

    private lastNode:LoadingAmount

    start() {
        this.backgroundMask.fillStart =0.2;
        let loadingNode = instantiate(this.Amount);
        loadingNode.parent = this.node;
        this.lastNode = loadingNode.getComponent(LoadingAmount);
    }

    onLoadScence(){
        this.loadOne().then(()=>{
            this.lastNode.tokeDMax+=0.33;
            this.loadTwo().then(()=>{
                this.lastNode.tokeDMax+=0.33;
                
                
            })
        })
        
        // Later, when you're ready to switch:
        // director.loadScene('Game');
    }
    loadOne(){
        return new Promise((resolve,reject)=>{
            director.preloadScene('Lobby', (error) => {
                if (!error) {
                    console.log('GameScene preloaded successfully');
                    reject(error);
                }
            });
            resolve('');
        })
    }
    loadTwo(){
        return new Promise((resolve,reject)=>{
            director.preloadScene('Game', (error) => {
                if (!error) {
                    console.log('GameScene preloaded successfully');
                    reject(error);
                }
            });
            resolve('');
        })
    }



    //显示完整第二背景 ，并且加载点击组件
    createClick(){
        this.backgroundMask.fillStart =0;
        let onClick = instantiate(this.clickNode);
        onClick.parent = this.node.parent;
    }

    //点击了开始
    onClick(){
        console.log('进游戏了');
        director.loadScene('Lobby')
    }

    protected onLoad(): void {
        //全局只充存着一个
        if(loading._instance == null){
            loading._instance = this;
       }else{
           this.node.destroy();
           return;
       }
   }
    //获取实例
    public static get Instance():loading{
        return this._instance;
    }
}


