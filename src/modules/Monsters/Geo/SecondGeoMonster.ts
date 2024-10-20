import Monster from "../Monster";

class SecondGeoMonster extends Monster {
    name: string = 'Ratata';
    attack: number = 100;
    healthPoint: number = 150;
    defense: number = 100;
    elementType: string = 'Geo';
    level: number = 1;
    skill = {
        name: 'glybopad',
        baseMultiplier: 1.2
    }   
}

export default SecondGeoMonster