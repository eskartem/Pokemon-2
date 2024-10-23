import Monster from "../Monster";

class FourthPyroMonster extends Monster {
    name: string = 'Growlithe';
    attack: number = 100;
    healthPoint: number = 200;
    defense: number = 100;
    elementType: string = 'Pyro';
    level: number = 2;
    isAlive: boolean = true;
    skill = {
        name: 'ashBlast',
        baseMultiplier: 1.5
    }   
}

export default FourthPyroMonster