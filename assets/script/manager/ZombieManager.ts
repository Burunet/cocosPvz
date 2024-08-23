import { _decorator, Component, find, instantiate, Node, Prefab, Vec3 } from 'cc';
import { Zombies } from '../Zombies/Zombies';
import { ZombiesAct, ZombiesState } from './Global';
const { ccclass, property } = _decorator;

@ccclass('ZombieManager')
export class ZombieManager extends Component {
    private static _instance: ZombieManager =null;

    @property([Prefab])
    public zombieArray:Prefab[]=[];

    protected onLoad(): void {
         //全局只充存着一个
         if(ZombieManager._instance == null){
            ZombieManager._instance = this;
        }else{
            this.node.destroy();
            return;
        }
    }

    protected update(dt: number): void {
        
    }

    createZombie(){
        find('Canvas/Game/Preview').destroy();
        for (let zombie of this.zombieArray) {
            let zombieNode = instantiate(zombie);

            let hang1 =find('Canvas/Game/CellList/hang1/Zombieshead');
            let lie = find('Canvas/Game/CellList/hang1/Cell-011');

            let newPosition = new Vec3(lie.position.x,20,0)
            zombieNode.parent = hang1;
            zombieNode.setPosition(newPosition);
            let nodeS = zombieNode.getComponent(Zombies)
            nodeS.ZombiesState= ZombiesState.Enable;
            nodeS.actState= ZombiesAct.Move;
        }
    }




    //获取实例
    public static get Instance():ZombieManager{
        return this._instance;
    }
}


