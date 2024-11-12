import Monster from "../Monster";

class FirstHydroMonster extends Monster {
    name: string = 'Magikarp';
    attack: number = 100;
    healthPoint: number = 200;
    defense: number = 100;
    elementType: string = 'Hydro';
    level: number = 1;
    isAlive: boolean = true;
    skill = {
        name: 'iceSquall',
        baseMultiplier: '????'
    }   
}

export default FirstHydroMonster