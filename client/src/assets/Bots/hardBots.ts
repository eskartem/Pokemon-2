import { 
    FirstAnemoMonster, SecondAnemoMonster, ThirdAnemoMonster, 
    FirstGeoMonster, ThirdGeoMonster, 
    FirstHydroMonster, SecondHydroMonster, ThirdHydroMonster, 
    FirstPyroMonster, SecondPyroMonster, ThirdPyroMonster 
} from '../Monsters/AllMoster';
import { Monsters } from '../Monsters/Monster';
import Bot from './bot';

class hardBot extends Bot {
    allMonsters: Monsters[] = [
        new FirstAnemoMonster('enemySide', 5),
        new SecondAnemoMonster('enemySide', 5),
        new ThirdAnemoMonster('enemySide', 5),
        new FirstGeoMonster('enemySide', 5),
        new ThirdGeoMonster('enemySide', 5),
        new FirstHydroMonster('enemySide', 5),
        new SecondHydroMonster('enemySide', 5),
        new ThirdHydroMonster('enemySide', 5),
        new FirstPyroMonster('enemySide', 5),
        new SecondPyroMonster('enemySide', 5),
        new ThirdPyroMonster('enemySide', 5)
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
            this.selectedMonsters = this.getRandomMonsters(5);
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

export default hardBot;