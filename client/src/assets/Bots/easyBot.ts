import { 
    FirstAnemoMonster, SecondAnemoMonster, ThirdAnemoMonster, 
    FirstGeoMonster, ThirdGeoMonster, 
    FirstHydroMonster, SecondHydroMonster, ThirdHydroMonster, 
    FirstPyroMonster, SecondPyroMonster, ThirdPyroMonster 
} from '../Monsters/AllMoster';
import { Monsters } from '../Monsters/Monster';
import Bot from './bot';

class easyBot extends Bot {
    allMonsters: Monsters[] = [
        new FirstAnemoMonster('enemySide', 1),
        new SecondAnemoMonster('enemySide', 1),
        new ThirdAnemoMonster('enemySide', 1),
        new FirstGeoMonster('enemySide', 1),
        new ThirdGeoMonster('enemySide', 1),
        new FirstHydroMonster('enemySide', 1),
        new SecondHydroMonster('enemySide', 1),
        new ThirdHydroMonster('enemySide', 1),
        new FirstPyroMonster('enemySide', 1),
        new SecondPyroMonster('enemySide', 1),
        new ThirdPyroMonster('enemySide', 1)
    ];

    selectedMonsters: Monsters[];

    constructor() {
        super();
        window.addEventListener('beforeunload', () => {
            localStorage.removeItem('selectedMonsters');
        });
        const savedMonsters = localStorage.getItem('selectedMonsters');
        if (savedMonsters) {
            this.selectedMonsters = JSON.parse(savedMonsters);
        } else {
            this.selectedMonsters = this.getRandomMonsters(3);
            localStorage.setItem('selectedMonsters', JSON.stringify(this.selectedMonsters));
        }
    }

    getRandomMonsters(num: number): Monsters[] {
        return getRandomElements(this.allMonsters, num);
    }
}

function getRandomElements(arr: Monsters[], num: number): Monsters[] {
    const result: Monsters[] = [];
    const usedIndices = new Set<number>();
    while (result.length < num) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            result.push(arr[randomIndex]);
        }
    }
    return result;
}

export default easyBot;