import Monster from "./Monster";
import image from '../img_monsters/squirtle.png'

class SixthBunny extends Monster  {
    name = 'Squirtle';
    Attack: number = 100;
    HealPoint: number = 150;
    Defense: number = 100;
    Speed: number = 50;
    ElementType: string | undefined;
    Level: number = 1;
    src: string = image;
}

export default SixthBunny;