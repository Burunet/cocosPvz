//卡牌 点击后的状态
export enum PlantState{
    Disable, //未激活-植物拿起状态
    Enable   //激活-植物种植状态
}

//卡牌卡槽状态
export enum CardState {
    Cooling,   //冷却中
    WaitingSun, // 等待阳光
    Ready      //准备种植
}

//卡牌类型--植物
export enum PlantType{
    Sunflower, //向日葵
    PeaShooter
}
