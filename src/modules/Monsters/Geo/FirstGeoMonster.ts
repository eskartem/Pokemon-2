import Monster from "../Monster";

class FirstGeoMonster extends Monster {
    name: string = 'Bulbasaur';
    attack: number = 100;
    healthPoint: number = 200;
    defense: number = 100;
    elementType: string = 'Geo';
    level: number = 1;
    isAlive: boolean = true;
    skill = {
        name: 'tectonicImpact',
        baseMultiplier: 1.5
    }   
}

export default FirstGeoMonster