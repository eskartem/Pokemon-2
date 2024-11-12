import Monster from "../Monster";

class FourthGeoMonster extends Monster {
    name: string = 'Dugtrio';
    attack: number = 100;
    healthPoint: number = 200;
    defense: number = 100;
    elementType: string = 'Geo';
    level: number = 1;
    isAlive: boolean = true;
    skill = {
        name: 'gravitationalWave',
        baseMultiplier: 0.25
    }   
}

export default FourthGeoMonster