import Monster from "../Monster";

class FourthHydroMonster extends Monster {
    name: string = 'Squirtle';
    attack: number = 100;
    healthPoint: number = 150;
    defense: number = 100;
    elementType: string = 'Hydro';
    level: number = 1;
    skill = {
        name: 'Whirlpool',
        basemultiplier: 1
    }   
}

export default FourthHydroMonster