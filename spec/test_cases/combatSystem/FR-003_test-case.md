
# Тест-кейс № 3

| Идентификатор | Приоритет | Требование ТЗ |
|---------------|------------|---------------|
| FR-003        | Средний    | Боевая система |

## Модуль
Боевая система

## Шаги тест-кейса
1. Правильное отображение покемонов и их статистик.
   - Шаг 1. Выбрать 3 разных покемона для каждого игрока.
   - Шаг 2. Убедиться, что на экране поле отображает своих покемонов слева, а покемонов противника справа а также отображаются их характеристики после нажатия на них (справа/слева) и имена (сверху).

2. Наличие следующих пунктов меню: скиллы, атака, защита и сбежать.
   - Шаг 1. Начать бой.
   - Шаг 2. Открыть меню во время боя.
   - Шаг 3. Проверить, что пункты меню «Скиллы», «Скилл», «Атака», «Защита» и «Сбежать» присутствуют и активны.

3. Проверить вероятность побега и что происходит при неудачном побеге.
   - Шаг 1. Во время боя выбрать пункт «Сбежать».
   - Шаг 2. Повторить попытку несколько раз для проверки вероятности побега (должно быть 10% успеха).
   - Шаг 3. Убедиться, что в случае неудачи ход передаётся противнику, и игрок теряет одно очко действия.

4. Проверить, что характеристики корректно влияют на ход боя.
   - Шаг 1. Начать бой с покемонами разного уровня и с различными характеристиками.
   - Шаг 2. Убедиться, что атака и защита покемонов влияют на исход боя в соответствии с их характеристиками.

5. Механика смерти покемона.
   - Шаг 1. Во время боя атаковать вражеского покемона до тех пор, пока его здоровье (HP) не достигнет 0.
   - Шаг 2. Убедиться, что после достижения 0 HP покемон умирает и его больше нельзя использовать в бою.
   - Шаг 3. Проверить, что после смерти покемона у игрока выбирается следующий по уровню покемон (если они остались).
   - Шаг 4. Убедиться, что мертвый покемон не участвует в следующих ходах и не отображается на поле.

6. Правильность порядка ходов. 
   - Шаг 1. Начать бой, сравнив уровни покемонов обеих сторон.
   - Шаг 2. Убедиться, что первым ходит покемон с более высоким уровнем.
   - Шаг 3. Если уровни одинаковы, убедиться, что порядок хода определяется случайным образом.

7. Работа очков действий.
   - Шаг 1. Во время боя убедиться, что у каждого игрока есть одно очко действия на ход.
   - Шаг 2. Использовать очко для атаки, защиты или побега.
   - Шаг 3. Убедиться, что очко снимается после действия.

8. Наличие и работа скиллов покемонов.
   - Шаг 1. Открыть список скиллов каждого покемона во время боя.
   - Шаг 2. Применить несколько скиллов и убедиться, что они работают в соответствии с описанием.

9. Разные типы покемонов.
   - Шаг 1. Выбрать покемонов разных типов стихий (Огонь, Вода, Воздух, Земля).
   - Шаг 2. Во время боя убедиться, что покемоны ведут себя в соответствии с их типами
 
10. Возможность выбора вражеского покемона для атаки.
    - Шаг 1. Начать ход, выбрать атаку или скилл.
    - Шаг 2. Выбрать вражеского покемона для атаки или скилла.
  
11. Окончание боя.
    - Шаг 1. Довести бой до завершения.
    - Шаг 2. Убедиться, что победитель получает 30% монет, 10% покемонов, и 20% кристаллов стихий проигравшего.
  
## Ожидаемый результат

1. Правильное отображение покемонов и их статистик.
   - Свои покемоны отображаются слева, а покемоны противника — справа. Количество покемонов у каждого игрока — 3, они различаются.
   - У каждого покемона отображается его название (сверху).
   - У каждого покемона отображаются (слева/справа) следующие характеристики после нажатия на покемона:
   - **Здоровье (HP):** по умолчанию 200.
   - **Атака (Attack):** от 50 до 150.
   - **Защита (Defense):** от 40 до 100.
   - **Уровень (Level):** от 1 до 5.

2. Наличие следующих пунктов меню: скиллы, скилл, атака, защита и сбежать.
   - Пункты меню «Скиллы», «Атака», «Защита» и «Сбежать» присутствуют и активны.

3. Проверить вероятность побега и что происходит при неудачном побеге.
   - Вероятность успешного побега составляет 10%.
   - В случае неудачного побега ход передается противнику, игрок теряет одно очко действия.

4. Проверить, что характеристики корректно влияют на ход боя.
   - Атака и защита покемонов влияют на исход боя в соответствии с их характеристиками. Более сильные покемоны наносят больше урона, а защита уменьшает урон правильно.

5. Механика смерти покемона.
   - Когда здоровье (HP) покемона достигает 0, покемон умирает и его больше нельзя использовать в бою.
   - После смерти покемона игра выбирает игроку следующего по уровню покемона, если в команде остались другие покемоны.
   - Мертвый покемон не участвует в следующих ходах.
   - Если у игрока не осталось покемонов, бой завершается, и противник объявляется победителем.

6. Правильность порядка ходов. 
   - Первый ход выполняется покемоном с более высоким уровнем.
   - Если уровни одинаковы, порядок ходов определяется случайным образом.

7. Работа очков действий.
   - Каждый игрок имеет одно очко действия на ход. Очко снимается после выполнения действия: атака, защита или попытка побега.

8. Наличие и работа скиллов покемонов.
   - Скиллы работают корректно и выполняют все, что описано в их характеристиках. Применение скиллов отображается правильно.

9. Разные типы покемонов.
   - Покемоны ведут себя в соответствии со своими типами. Сильные и слабые стороны разных типов корректно влияют на бой.

10. Возможность выбора вражеского покемона для атаки.
    - После выбора атаки или скилла, вражеский покемон успешно выбран для атаки.
    - Урон нанесён выбранному вражескому покемону.
    - Характеристики покемона (HP) уменьшаются на величину нанесённого урона в соответствии с параметрами атаки или скилла.
    - Другие вражеские покемоны не получают урон.

11. Окончание боя.
    - После завершения боя победитель получает 30% монет, 10% покемонов и 20% кристаллов стихий проигравшего. Проигравший теряет данные ресурсы.