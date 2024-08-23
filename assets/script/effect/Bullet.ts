import { _decorator, AudioSource, Component, find, log, Node } from 'cc';
import{BulletType, ZombiesState} from '../manager/Global';
import { Zombies } from '../Zombies/Zombies';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    @property(Node)
    public PeaBullet: Node = null; //普通豌豆  20
    @property(Node)
    public SnowPeaBullet: Node = null; //冰豌豆
    @property(Node)
    public FireBullet: Node = null; //火豌豆
    @property(Node)
    public PeaBulletHit: Node = null; //豌豆击中
    @property([AudioSource])
    public audioArray: AudioSource[] = []; //音乐

    public bulletType:BulletType=BulletType.PeaBullet;

    public hang:string;
    public changeNum:number;  //子弹伤害
    public moveState:boolean=true;  //是否继续移动
    private endPosition:number;  //无阻挡时子弹最终到达位置
    

    start() {
        this.audioArray[0].play();
        this.changeBulletType(this.bulletType);
    }

    update(deltaTime: number) {
        
        //检查是否可以移动  --并继续移动
        if(this.moveState){
            this.node.setPosition(this.node.position.x+2,this.node.position.y,0)

            //检查是否有物品阻挡---...
            let position = this.node.position;
            let ZombiesNode = find('Canvas/Game/CellList/'+this.hang+'/Zombieshead').children;
            if(ZombiesNode.length>0){
                for (let zombies of ZombiesNode) {
                    let zombieScript = zombies.getComponent(Zombies);
                    if(zombies.position.x<=position.x && [ZombiesState.Enable,ZombiesState.Damage,ZombiesState.HPEnd].indexOf(zombieScript.ZombiesState)>-1){
                        zombieScript.HPChange( -this.changeNum);
                        this.changeBulletType(BulletType.PeaBulletHit);
                    }
                }
            }


        }
       if(this.node.position.x >= this.endPosition){
        this.node.destroy()
       }
    }

    //修改豌豆类型
    changeBulletType(Type:BulletType){
        switch (Type) {
            case BulletType.PeaBullet:
                this.changeNum=20
                this.bulletType = Type;
                this.PeaBullet.active =true;
                this.SnowPeaBullet.active =false;
                this.FireBullet.active =false;
                this.PeaBulletHit.active =false;
                break;
            case BulletType.SnowPeaBullet:
                this.changeNum=20
                this.bulletType = Type
                this.PeaBullet.active =false;
                this.SnowPeaBullet.active =true;
                this.FireBullet.active =false;
                this.PeaBulletHit.active =false;
                break;
            case BulletType.FireBullet:
                this.changeNum=40
                this.bulletType = Type;
                this.PeaBullet.active =false;
                this.PeaBulletHit.active =false;
                this.SnowPeaBullet.active =false;
                this.FireBullet.active =true;
                break;
            case BulletType.PeaBulletHit:
                    this.audioArray[1].play();
                    this.changeNum=0
                    this.bulletType = Type;
                    this.PeaBullet.active =false;
                    this.PeaBulletHit.active =true;
                    this.SnowPeaBullet.active =false;
                    this.FireBullet.active =false;
                    this.moveState = false;  //停止移动
                    setTimeout(()=>{
                        this.node.destroy();
                    },200)
                    break;
        }
    }



    //设定最终到达位置--到达后删除
    setEndPosition(position:any){
        this.endPosition = position;
        
    }


}


