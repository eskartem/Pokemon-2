import Monster from "../Monster";

class ThirdHydroMonster extends Monster {
    name: string = 'Poliwhirl';
    attack: number = 100;
    healthPoint: number = 200;
    defense: number = 100;
    elementType: string = 'Hydro';
    level: number = 1;
    isAlive: boolean = true;
    skill = {
        name: 'waveOfDestruction',
        baseMultiplier: 1.2,
        baseMultiplierOnTheSides: 0.5
    }    
}

export default ThirdHydroMonster