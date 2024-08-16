//卡牌 点击后的状态
export enum PlantState{
    Disable, //未激活-植物拿起状态
    Enable,   //激活-植物种植状态
    EnableHodel,  //激活，阳光正在生产
    EnableIng //执行中
}

//卡牌卡槽状态
export enum CardState {
    Cooling,   //冷却中
    WaitingSun, // 等待阳光
    Ready,      //准备种植
    Click       //选中状态-正在种植中 
}

//卡牌类型--植物
export enum PlantType{
    Sunflower, //向日葵
    PeaShooter
}

// 格子状态
export enum CellState{
    Have,  //存在植物
    None   //空格子
}

