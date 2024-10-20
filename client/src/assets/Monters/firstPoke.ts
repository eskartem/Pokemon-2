import Monster from "./Monster";
import image from '../img_monsters/tepig.png'

class FirstBunny extends Monster  {
    name = 'Tepig';
    Attack: number = 100;
    HealPoint: number = 150;
    Defense: number = 100;
    Speed: number = 100;
    ElementType: string | undefined;
    Level: number = 1;
    src: string = image;
}

export default FirstBunny;