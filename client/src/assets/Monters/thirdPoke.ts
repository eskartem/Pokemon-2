import Monster from "./Monster";
import image from '../img_monsters/pichu.png'

class ThirdBunny extends Monster  {
    name = 'Pichu';
    Attack: number = 100;
    HealPoint: number = 150;
    Defense: number = 100;
    Speed: number = 80;
    ElementType: string | undefined;
    Level: number = 1;
    src: string = image
}

export default ThirdBunny;