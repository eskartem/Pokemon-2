import Monster from "../Monster";

class SecondAnemoMonster extends Monster {
    name: string = 'Butterfree';
    attack: number = 100;
    healthPoint: number = 200;
    defense: number = 100;
    elementType: string = 'Anemo';
    level: number = 1;
    isAlive: boolean = true;
    skill = {
        name: 'ravitationalWave',
        baseMultiplier: 1.1
    }   
}

export default SecondAnemoMonster