import Monster from "../Monster";

class FirstAnemoMonster extends Monster {
    name: string = 'Pidgey';
    attack: number = 100;
    healthPoint: number = 200;
    defense: number = 100;
    elementType: string = 'Anemo';
    level: number = 1;
    isAlive: boolean = true;
    skill = {
        name: 'windStrike',
        baseMultiplier: 1.3
    }   
}

export default FirstAnemoMonster
