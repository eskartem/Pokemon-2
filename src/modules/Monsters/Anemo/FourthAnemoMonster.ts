import Monster from "../Monster";

class FourthAnemoMonster extends Monster {
    name: string = "Farfetch'd";
    attack: number = 100;
    healthPoint: number = 200;
    defense: number = 100;
    elementType: string = 'Anemo';
    level: number = 5;
    isAlive: boolean = true;
    skill = {
        name: 'сycloneOfDestruction',
        baseMultiplier: 1.5
    }   
}

export default FourthAnemoMonster