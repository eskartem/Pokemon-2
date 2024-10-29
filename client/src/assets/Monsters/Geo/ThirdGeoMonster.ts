import Monster from "../Monster";

class ThirdGeoMonster extends Monster {
    name: string = 'Sandshrew';
    attack: number = 100;
    healthPoint: number = 200;
    defense: number = 100;
    elementType: string = 'Geo';
    level: number = 1;
    isAlive: boolean = true;
    skill = {
        name: 'earthimpulse',
        baseMultiplier: '?????'
    }   
}

export default ThirdGeoMonster