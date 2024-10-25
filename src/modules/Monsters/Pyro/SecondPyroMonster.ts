import Monster from "../Monster";

class SecondPyroMonster extends Monster {
    name: string = 'Charmander';
    attack: number = 100;
    healthPoint: number = 200;
    defense: number = 100;
    elementType: string = 'Pyro';
    level: number = 4;
    isAlive: boolean = true;
    skill = {
        name: 'phoenixSpark',
        baseMultiplier: 1.1
    }   
}

export default SecondPyroMonster