//卡牌 点击后的状态
export enum PlantState{
    Disable, //未激活-植物拿起状态
    Enable,   //激活-植物种植状态
    EnableHodel,  //激活，阳光正在生产
    EnableIng //执行中
}

//卡牌卡槽状态
export enum CardState {
    NoShow,           //游戏未开始
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
    None,   //空格子
    KenNone, //有坑的空格子
    PlantNot //非植物放置格子
}

//阳光类型
export enum SunState{
    Enable,  //可被点击-等待时间结束后回收
    Disable  //正在移动向不可回收
}
       
export enum GameState{  // 游戏状态
    CardSelection,  //选卡
    Loading,        //加载
    Afoot,          //进行中
    Suspend         //暂停
}

//豌豆类型
export enum BulletType {
    PeaBullet, //普通豌豆
    SnowPeaBullet, //冰豌豆
    FireBullet, //火豌豆
    PeaBulletHit
}

//僵尸类型
export enum Zombies{
    ZombiesOne,
    ZombiesTow,
}

//僵尸状态
export enum ZombiesState{
    Disable,  //未激活状态
    Enable,  //激活可移动
    Damage,   //断手状态
    HPEnd,   //掉头状态 -有效灵界
    HPEndT,   //掉头状态 -无效灵界
    Die

}

//僵尸行动
export enum ZombiesAct{
    Move,
    Eat,
    LostHeadMove,
    LostHeadEat,
    Die,
    BormDie,
    BackDie,
    stop
}
