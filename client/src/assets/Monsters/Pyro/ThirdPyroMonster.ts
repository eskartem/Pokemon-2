import Monster from "../Monster";

class ThirdPyroMonster extends Monster {
    name: string = 'Ponyta';
    attack: number = 100;
    healthPoint: number = 200;
    defense: number = 100;
    elementType: string = 'Pyro';
    level: number = 1;
    isAlive: boolean = true;
    skill = {
        name: 'fireStorm',
        baseMultiplier: 1.2
    }   
}

export default ThirdPyroMonster