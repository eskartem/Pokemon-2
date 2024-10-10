# Игра "Монстарис"

Файтинговая арена с перемещениями по карте и экономической системой.

## Содержание

1. [Термины и определения](#термины-и-определения)
2. [Общая концепция](#общая-концепция)
   1. [Цели и задачи](#цели-и-задачи)
   2. [Концепция](#концепция)
   3. [Дальнейшее развитие](#дальнейшее-развитие)
3. [Лор](#лор)
4. [Номенклатура покемонов](#номенклатура-покемонов)
5. [Система апгрейдов](#система-апгрейдов)
6. [Процесс старта](#процесс-старта)
7. [Дополнительные моменты](#дополнительные-моменты)

---

## 1. Термины и определения

- **Покемоны** — существа, из которых состоит отряд игрока. Каждый покемон обладает своими стихиями и набором навыков.
- **Яйцо покемона** — яйцо, из которого вылупится случайный покемон.
- **Кусок яйца покемона** — часть яйца, которую можно обменять на полноценное яйцо.
- **Скиллы** — способности покемонов, используемые в бою.
- **Система стихий** — набор правил взаимодействия стихий, влияющий на эффективность атак и скиллов.
- **Ход** — один раунд действий покемона в бою.
- **Эффекты** — дополнительные состояния, применяемые к покемонам (например, оглушение, усиление).
- **Рынок** — место торговых операций между игроками (покупка и продажа покемонов, предметов, ресурсов).
- **Обменник** — персонаж, который позволяет обменивать одни ресурсы на другие.
- **Торговец** — персонаж, у которого можно продать ресурсы (кристаллы стихий, покемонов и т.д.).
- **Биом** — область на карте, усиливающая или ослабляющая определенные типы атак в зависимости от их стихии.
- **Безопасная зона** — области на карте, в которых невозможны сражения.
- **Главный город** — безопасная зона с рынком, обменником и торговцем.
- **Chill zone** — другие безопасные зоны на карте, без рынка и сражений.
- **Данж** — определенный тип локации на карте, где игроки сражаются с боссами (ботами), получая монеты и ресурсы. В зависимости от сложности данжа, награды могут быть большими или меньшими. Также существует шанс выпадения кусков яйца.
- **Кристаллы стихий** — ресурс для прокачки покемонов, доступный в данжах.

---

## 2. Общая концепция

Игра представляет собой файтинговую арену с перемещениями по карте. Игроки управляют командами из трех покемонов, обладающих уникальными характеристиками, стихиями и навыками. Основная цель — сформировать сильнейший отряд, используя ресурсы открытого мира, а также торговую систему, где игроки могут покупать и продавать покемонов и предметы.

### 2.1. Цели и задачи

- **Цель**: Создать веб-игру с элементами мультиплеера и торгового рынка.
- **Задача**: разработка игры с поддержкой мультиплеера, торгового рынка и системы прогрессии покемонов. Осуществить сдачу проекта преподавателю (Трусову А.С.)

### 2.2. Концепция

Игра является web-приложением и доступна в следующих браузерах: Google Chrome, Yandex Browser, Mozilla Firefox. Для игры требуется наличие интернета. На телефонах и планшетах игра доступна только в горизонтальном режиме. Игроки будут выбирать команду из трех покемонов и участвовать в пошаговых PvP-сражениях на карте, а также PvE сражениях в данжах.

#### Вкладка «Карта»

Карта поделена на квадраты (матрица x:y) с различными биомами. На карте также находятся главный город, chill zones и данжи.

Биомы:

- **Лес** (земля)
- **Водоем** (вода)
- **Пустыня** (огонь)
- **Поляна** (воздух)

#### Вкладка «Рынок»

- Рынок находится в главном городе.
- Игроки могут выставлять товары на продажу, оплачивая определённый залог от установленной цены.
  - Если товар куплен, залог возвращается. Если товар убирается с продажи, залог не возвращается.
  - Владелец товара получает определённый процент от суммы продажи, а оставшаяся сумма уходит на комиссию.
- На рынке имеется торговец и обменник.
- Игрок не может продавать покемонов, если их осталось 3.

#### Механика передвижения

Передвижение по карте осуществляется с задержкой. Игрок может указать путь заранее или двигаться постепенно. Его отряд покемонов движется по клеткам с скоростью, зависящей от их характеристик. Игроки могут ходить одновременно.

#### Вкладка «Бой»

Бой начинает тот, у кого наибольшая сумма уровней покемонов. Ходы самих покемонов распределяется по уровням покемонов игрока (от большего к меньшему).

Каждый ход у игрока есть 2 варианта:

- Сбежать: всегда будет доступна кнопка “Сбежать”. Ее можно нажать 1 раз за каждый из ходов. С определенной вероятностью игрок убегает с поединка и сохраняет ресурсы. Если не удалось – ход переходит противнику.
- Атаковать: У каждого покемона есть свое количество скиллов (смотреть “4. Номенклатура покемонов”). Для атаки нужно выбрать один скилл из перечня (который будет появляться на экране игры для атакующего покемона).

Цель — уничтожить противника и забрать его ресурсы.
Победивший забирает у проигравшего 30% монет, 10% покемонов и 20% кристаллов стихий.

После окончания боя:

- Победивший остается на карте.
- Проигравший перемещается в главный город.

#### Вкладка «Рейтинг»

В игре присутствует рейтинг игроков, складывающийся от общего числа покемонов, их уровня, соотношения побед и поражений, также есть отдельная рейтинговая таблица, зависящая от количества монет.

Прокачка покемонов:

- Приобрести покемона можно двумя способами:

  - Собрать в данжах куски яиц, обменять их в городе на целое яйцо.
  - Купить на рынке.

#### Прокачка покемонов

Покемонов можно приобрести, собрав куски яиц или купив их на рынке. Прокачка осуществляется с помощью кристаллов стихий и монет.

### 2.3. Дальнейшее развитие

- **Монетизация**: Будут разработаны внутриигровые покупки.

---

## 3. Лор

Фэнтезийный мир, где магические стихии играют ключевую роль. Игроки управляют отрядами покемонов, сражающихся за власть, ресурсы и контроль на рынке.

---

## 4. Номенклатура покемонов

- **Огонь**: Наносит увеличенный урон по земле, слаб против воды.
- **Вода**: Усиливается в водоемах, поглощает огненные атаки.
- **Земля**: Имеет высокую защиту, устойчива к атакам воздуха.
- **Воздух**: Быстрая и ловкая стихия, эффективна против воды.

---

## 5. Система апгрейдов

- **Уровни покемонов**: Влияют на очередность ходов в бою и увеличивают ману.
- **Улучшение навыков**: Навыки покемонов можно улучшить с помощью ресурсов с рынка.

---

## 6. Процесс старта

Игрок регистрируется с никнеймом, почтой и паролем, получая стартовый набор монет и покемонов для начала игры.

---

## 7. Дополнительные моменты

### 7.1. Технические показатели завершенности проекта

- Реализована карта.
- Работоспособная система PvP и PvE-сражений.
- Функционирующий рынок.
- Регистрация/авторизация пользователей.
- Прокачка покемонов.

### 7.2. Риски проекта

- Технические сложности с мультиплеером и поддержкой пользователей.
- Перегрузка серверов.
- Балансировка стихий и навыков для PvP.

### 7.3. Технологический стек

- **Frontend**: React TS, PixiJS для рендеринга.
- **Backend**: PHP для обработки запросов.
- **База данных**: MySQL.
- **Сервер**: Apache или Nginx, облачные сервисы (AWS или DigitalOcean).
