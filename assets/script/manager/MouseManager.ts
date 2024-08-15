import { _decorator, Component, instantiate, Node } from 'cc';
import { PlantType } from './Global';
import { Plant } from '../Plant';
const { ccclass, property } = _decorator;

@ccclass('MouseManager')
export class MouseManager extends Component {
    private static _instance: MouseManager =null;
    
    //存在的植物脚本
    @property([Plant])
    public plantPrefabArray:Plant[]=[];

    private currentPlant:Plant;

    //获取实例
    public static get Instance():MouseManager{
        return this._instance;
    }
    //生命周期 初始化 onload 
    protected onLoad(): void {
        //全局只充存着一个
        if(MouseManager._instance == null){
            MouseManager._instance = this;
        }else{
            this.node.destroy();
            return;
        }
    }

    //局内，点击可种植植物 植物跟随鼠标
    addPlant(Type:PlantType){
        let plantPrefab = this.getPlantPrefab(Type);
        if(plantPrefab == null){
            console.log('植物逻辑不存在');
            return;
        }
        this.currentPlant = instantiate(plantPrefab.node);
        this.currentPlant.parent = this.node.parent
    }

    // 是否有设定该植物的脚本，有则返回，无则为空
    getPlantPrefab(Type:PlantType):Plant {
        for(let plant of this.plantPrefabArray){
            if(plant.PlantType == Type){
                return plant;
            }
        }
        return null;
    }
}


