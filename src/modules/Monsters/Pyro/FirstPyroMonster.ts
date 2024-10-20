import Monster from "../Monster";

class FirstPyroMonster extends Monster {
    name: string = 'Flareon';
    attack: number = 100;
    healthPoint: number = 150;
    defense: number = 100;
    elementType: string = 'Pyro';
    level: number = 1;
    skill = {
        name: 'incineratingStrike',
        baseMultiplier: 1.4
    }   
}

export default FirstPyroMonster