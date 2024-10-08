import { _decorator, AudioSource, Component, find, instantiate, Node, Prefab } from 'cc';
import { MouseManager } from '../MouseManager';
const { ccclass, property } = _decorator;

@ccclass('GameLoading')
export class GameLoading extends Component {
    //好 准备 开始 动画贴图
    @property([Prefab])
    public startPrefabArray:Prefab[]=[];
    //音乐资源
    @property(AudioSource)
    public audioSource: AudioSource | null = null;
    
    onStartToGameLodding(){
        this.audioSource.play()
        let startNode = instantiate(this.startPrefabArray[0]);
        startNode.parent = find('Canvas/Game');
        setTimeout(()=>{
            startNode.destroy()
            startNode = instantiate(this.startPrefabArray[1]);
            startNode.parent = find('Canvas/Game');
            setTimeout(()=>{
                startNode.destroy()
                startNode = instantiate(this.startPrefabArray[2]);
                startNode.parent = find('Canvas/Game');
                setTimeout(()=>{
                    startNode.destroy();
                    this.audioSource.stop()
                    //文字结束 开始转到游戏进行时
                    MouseManager.Instance.transitionToAfoot()
                },1000)
            },800)
        },800)
        //转到游戏进行中
       
    }
}


