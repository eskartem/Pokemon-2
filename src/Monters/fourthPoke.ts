import Monster from "./Monster";
import image from '../img/bulbasaur.png'

class FourthBunny extends Monster  {
    name = 'Bulbasaur';
    Attack: number = 100;
    HealPoint: number = 150;
    Defense: number = 100;
    Speed: number = 70;
    ElementType: string | undefined;
    Level: number = 1;
    src: string = image;
}

export default FourthBunny;