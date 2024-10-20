import Monster from "../Monster";

class ThirdAnemoMonster extends Monster {
    name: string = 'Zubat';
    attack: number = 100;
    healthPoint: number = 150;
    defense: number = 100;
    elementType: string = 'Anemo';
    level: number = 1;
    skill = {
        name: 'windBlade',
        baseMultiplier: 1.2
    }   
}

export default ThirdAnemoMonster