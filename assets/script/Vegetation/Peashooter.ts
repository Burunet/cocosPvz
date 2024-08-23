import { _decorator, Component, director, find, instantiate, log, Node, Prefab, Vec3 } from 'cc';
import { Plant } from '../Plant';
import { PlantState } from '../manager/Global';
import { Bullet } from '../effect/Bullet';
import { Hang } from '../Game/Hang';
const { ccclass, property } = _decorator;

@ccclass('Peashooter')
export class Peashooter extends Component {

    //植物父级脚本
    private plant:Plant;


    @property({type:Prefab,tooltip:'豌豆动画'})
    BulletPrefab:Prefab =null;
    
    start() {
        this.plant= this.getComponent(Plant);
    }

    update(deltaTime: number) {
        switch (this.plant.plantState) {
            case PlantState.Enable:  //激活状态执行
                this.plant.cdTime -=deltaTime;
                if(this.plant.cdTime<=0){
                    //转到待生产
                    this.plant.transitionToEnableHodel();
                }
                break;
            case PlantState.EnableHodel:  //待生产状态执行-检查前方是否有可攻击
                this.enableHodel();
                break;
        }
    }
    enableHodel(){
        //需要发射判断
        if(!this.isHave())return;
        
        let bulletNode = instantiate(this.BulletPrefab);
        bulletNode.parent = find('Canvas/ForeGround');
        let positionX =this.node.position.x;        //取得当前植物的位置 的x坐标
        let positionY =this.node.parent.parent.position.y; //取得当前植物格子的位置行 的y坐标
        //子弹生成位置
        let bulletPosation = new Vec3(positionX+40,positionY+25,0);
        
        bulletNode.setPosition(bulletPosation);
        let bulletSprit =bulletNode.getComponent(Bullet);
        bulletSprit.setEndPosition(600);
        bulletSprit.hang=this.node.parent.parent.name;
        this.toEnable();

    }
    //需要发射判断方法
    isHave():boolean{
       
        return this.node.parent.parent.getComponent(Hang).HaveZombies
        
        
    }

    toEnable(){
        //转回激活状态 重置生产等待时间
        this.plant.plantState=PlantState.Enable;
        this.plant.plantStart();
    }
}


