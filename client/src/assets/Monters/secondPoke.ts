import Monster from "./Monster";
import image from '../img_monsters/hoothoot.png'

class SecondBunny extends Monster  {
    name = 'Hoothoot';
    Attack: number = 100;
    HealPoint: number = 150;
    Defense: number = 100;
    Speed: number = 90;
    ElementType: string | undefined;
    Level: number = 1;
    src: string = image
}

export default SecondBunny;