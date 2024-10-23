import Monster from "../Monster";

class FourthHydroMonster extends Monster {
    name: string = 'Squirtle';
    attack: number = 100;
    healthPoint: number = 200;
    defense: number = 100;
    elementType: string = 'Hydro';
    level: number = 1;
    isAlive: boolean = true;
    skill = {
        name: 'Whirlpool',
        basemultiplier: 1
    }   
}

export default FourthHydroMonster