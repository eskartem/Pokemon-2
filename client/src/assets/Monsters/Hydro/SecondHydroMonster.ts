import Monster from "../Monster";

class SecondHydroMonster extends Monster {
    name: string = 'Omanyte';
    attack: number = 100;
    healthPoint: number = 200;
    defense: number = 100;
    elementType: string = 'Hydro';
    level: number = 1;
    isAlive: boolean = true;
    skill = {
        name: 'Cascade',
        baseMultiplier: '???'
    }   
}

export default SecondHydroMonster