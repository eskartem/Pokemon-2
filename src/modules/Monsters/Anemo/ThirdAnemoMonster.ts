import Monster from "../Monster";

class ThirdAnemoMonster extends Monster {
    name: string = 'Zubat';
    attack: number = 100;
    healthPoint: number = 200;
    defense: number = 100;
    elementType: string = 'Anemo';
    level: number = 1;
    isAlive: boolean = true;
    skill = {
        name: 'windBlade',
        baseMultiplier: 1.2
    }   
}

export default ThirdAnemoMonster