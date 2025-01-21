-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 21 2025 г., 17:23
-- Версия сервера: 8.0.30
-- Версия PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `monstaris`
--

-- --------------------------------------------------------

--
-- Структура таблицы `bots`
--

CREATE TABLE `bots` (
  `id` int NOT NULL,
  `x` int NOT NULL,
  `y` int NOT NULL,
  `difficulty` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `bots`
--

INSERT INTO `bots` (`id`, `x`, `y`, `difficulty`) VALUES
(1, 10, 20, 1),
(2, 20, 20, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `elements`
--

CREATE TABLE `elements` (
  `id` int NOT NULL,
  `name` varchar(8) NOT NULL,
  `boost_id` int NOT NULL,
  `nerf_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `elements`
--

INSERT INTO `elements` (`id`, `name`, `boost_id`, `nerf_id`) VALUES
(1, 'Вода', 2, 3),
(2, 'Огонь', 4, 1),
(3, 'Земля', 1, 4),
(4, 'Воздух', 3, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `fight`
--

CREATE TABLE `fight` (
  `id` int NOT NULL,
  `user1_id` int NOT NULL,
  `user2_id` int NOT NULL,
  `turn` int NOT NULL,
  `status` varchar(16) NOT NULL,
  `result` int NOT NULL,
  `queue1` int DEFAULT NULL COMMENT 'queue',
  `queue2` int DEFAULT NULL COMMENT 'queue',
  `queue3` int DEFAULT NULL COMMENT 'queue',
  `queue4` int DEFAULT NULL COMMENT 'queue',
  `queue5` int DEFAULT NULL COMMENT 'queue',
  `queue6` int DEFAULT NULL COMMENT 'queue'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `fight`
--

INSERT INTO `fight` (`id`, `user1_id`, `user2_id`, `turn`, `status`, `result`, `queue1`, `queue2`, `queue3`, `queue4`, `queue5`, `queue6`) VALUES
(1, 1, 3, 1, 'close', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 1, 2, 0, 'open', 0, 2, 0, 4, 0, 6, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `game`
--

CREATE TABLE `game` (
  `id` int NOT NULL,
  `map_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `game`
--

INSERT INTO `game` (`id`, `map_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `hashes`
--

CREATE TABLE `hashes` (
  `id` int NOT NULL,
  `chat_hash` varchar(256) NOT NULL,
  `map_hash` varchar(32) NOT NULL,
  `battle_hash` varchar(256) NOT NULL,
  `market_hash` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `hashes`
--

INSERT INTO `hashes` (`id`, `chat_hash`, `map_hash`, `battle_hash`, `market_hash`) VALUES
(1, 'd54549bb2c64c7c0472a1b627d150dcf', 'aa03e9680150a5281aeb1b50ce209af0', 'fc883db1f0c02fe419d6be1b668e498c', 'fabceea19fc9e3671afa4c9ff11ba177');

-- --------------------------------------------------------

--
-- Структура таблицы `inventory`
--

CREATE TABLE `inventory` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `resource_id` int NOT NULL,
  `resource_amount` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `inventory`
--

INSERT INTO `inventory` (`id`, `user_id`, `resource_id`, `resource_amount`) VALUES
(1, 1, 1, 10),
(2, 1, 2, 1565),
(3, 1, 3, 2250),
(4, 2, 1, 1),
(5, 2, 2, 0),
(6, 2, 3, 0),
(7, 3, 1, 0),
(8, 3, 2, 0),
(9, 3, 3, 177),
(10, 4, 1, 10000),
(11, 4, 2, 8440),
(12, 4, 3, 9000),
(34, 5, 1, 0),
(35, 5, 2, 0),
(36, 5, 3, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `lots`
--

CREATE TABLE `lots` (
  `id` int NOT NULL,
  `seller_id` int NOT NULL,
  `datetime` datetime NOT NULL,
  `start_cost` int NOT NULL,
  `step_cost` int NOT NULL,
  `current_cost` int NOT NULL,
  `buyer_id` int DEFAULT NULL,
  `type` varchar(32) NOT NULL,
  `selling_id` int NOT NULL,
  `amount` int DEFAULT NULL,
  `status` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `lots`
--

INSERT INTO `lots` (`id`, `seller_id`, `datetime`, `start_cost`, `step_cost`, `current_cost`, `buyer_id`, `type`, `selling_id`, `amount`, `status`) VALUES
(1, 2, '2024-12-04 20:27:15', 1000, 100, 1300, NULL, 'monster', 3, NULL, 'cancelled'),
(2, 3, '2024-12-04 20:49:25', 100, 25, 250, 4, 'item', 3, 177, 'cancelled'),
(10, 4, '2024-12-31 20:49:50', 1000, 101, 1000, NULL, 'monster', 4, NULL, 'closed'),
(11, 4, '2024-12-31 20:53:47', 1352, 16, 1352, 1, 'item', 3, 1000, 'closed'),
(12, 4, '1666-12-19 20:54:13', 18882, 200, 18882, NULL, 'item', 1, 1560, 'closed'),
(13, 4, '2024-12-19 20:54:21', 18882, 2000, 18882, 1, 'item', 2, 1560, 'closed'),
(14, 4, '1899-12-31 00:00:00', 1337, 666, 1337, NULL, 'monster', 9, NULL, 'closed'),
(15, 4, '2024-12-19 23:43:27', 1337, 666, 1337, NULL, 'monster', 9, NULL, 'open');

-- --------------------------------------------------------

--
-- Структура таблицы `map`
--

CREATE TABLE `map` (
  `id` int NOT NULL,
  `name` varchar(16) NOT NULL,
  `width` int NOT NULL,
  `height` int NOT NULL,
  `image` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `map`
--

INSERT INTO `map` (`id`, `name`, `width`, `height`, `image`) VALUES
(1, 'карта', 160, 90, '../../assets/img/map.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `map_zones`
--

CREATE TABLE `map_zones` (
  `id` int NOT NULL,
  `map_id` int NOT NULL,
  `name` varchar(16) NOT NULL,
  `x` int NOT NULL,
  `y` int NOT NULL,
  `width` int NOT NULL,
  `height` int NOT NULL,
  `type` varchar(16) NOT NULL,
  `element_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `map_zones`
--

INSERT INTO `map_zones` (`id`, `map_id`, `name`, `x`, `y`, `width`, `height`, `type`, `element_id`) VALUES
(1, 1, 'город', 57, 43, 34, 9, 'town', NULL),
(2, 1, 'перекати-поле', 26, 18, 8, 8, 'chillzone', NULL),
(3, 1, 'куст', 24, 78, 11, 7, 'chillzone', NULL),
(4, 1, 'корабль', 95, 58, 12, 6, 'chillzone', NULL),
(5, 1, 'пещера', 142, 20, 6, 4, 'chillzone', NULL),
(6, 1, 'пустыня', 0, 0, 73, 46, 'dungeon', 2),
(7, 1, 'горы', 73, 0, 87, 46, 'dungeon', 3),
(8, 1, 'лес', 0, 46, 80, 45, 'dungeon', 4),
(9, 1, 'озеро', 80, 46, 80, 44, 'dungeon', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `message` varchar(256) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `messages`
--

INSERT INTO `messages` (`id`, `user_id`, `message`, `created`) VALUES
(1, 1, 'дурак', '2024-10-30 06:49:22'),
(2, 1, 'сам дурак', '2024-10-30 06:52:42'),
(3, 3, 'Ты чё, пёс?!', '2024-10-30 06:53:34'),
(4, 3, 'новое сообщение', '2024-10-30 06:54:41'),
(5, 1, 'сама ДУРА!!!', '2024-10-30 06:57:20'),
(6, 1, 'ljskjhdfg', '2024-11-13 07:23:07'),
(7, 1, 'sdfsd', '2024-12-04 22:40:00'),
(8, 4, 'пользователь для тестов, не обновляйте ему токен для удобства', '2024-12-06 14:58:30');

-- --------------------------------------------------------

--
-- Структура таблицы `monsters`
--

CREATE TABLE `monsters` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `monster_type_id` int NOT NULL,
  `level` int NOT NULL,
  `hp` int NOT NULL,
  `status` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `monsters`
--

INSERT INTO `monsters` (`id`, `user_id`, `monster_type_id`, `level`, `hp`, `status`) VALUES
(1, 1, 1, 2, 0, 'in team'),
(2, 1, 7, 4, 234, 'in team'),
(3, 1, 2, 5, 0, 'in team'),
(4, 4, 2, 5, 100, 'in pocket'),
(5, 4, 1, 1, 0, 'in team'),
(6, 4, 4, 5, 453, 'in team'),
(7, 4, 1, 5, 756, 'in team'),
(8, 4, 6, 1, 40, 'in pocket'),
(9, -1, 4, 4, 2000, 'on sale'),
(10, 2, 11, 3, 0, 'in team'),
(11, 2, 2, 4, 0, 'in team'),
(12, 2, 9, 1, 952, 'in team'),
(13, 3, 10, 2, 550, 'in team'),
(14, 3, 12, 4, 900, 'in team'),
(15, 3, 3, 1, 200, 'in team'),
(16, 5, 3, 1, 500, 'in team'),
(17, 5, 6, 1, 530, 'in team'),
(18, 5, 10, 1, 450, 'in team');

-- --------------------------------------------------------

--
-- Структура таблицы `monster_level`
--

CREATE TABLE `monster_level` (
  `id` int UNSIGNED NOT NULL,
  `level` int NOT NULL,
  `attack` int NOT NULL,
  `hp` int NOT NULL,
  `defense` int NOT NULL,
  `cost` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Стандартное увеличение характеристик покемонов при улучшении';

--
-- Дамп данных таблицы `monster_level`
--

INSERT INTO `monster_level` (`id`, `level`, `attack`, `hp`, `defense`, `cost`) VALUES
(1, 2, 40, 90, 5, 10),
(2, 3, 70, 110, 10, 20),
(3, 4, 120, 150, 15, 100),
(4, 5, 200, 270, 20, 500);

-- --------------------------------------------------------

--
-- Структура таблицы `monster_types`
--

CREATE TABLE `monster_types` (
  `id` int NOT NULL,
  `element_id` int NOT NULL,
  `name` varchar(16) NOT NULL,
  `hp` int NOT NULL,
  `attack` int NOT NULL,
  `defense` int NOT NULL,
  `image` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `monster_types`
--

INSERT INTO `monster_types` (`id`, `element_id`, `name`, `hp`, `attack`, `defense`, `image`) VALUES
(1, 1, 'Рыба капля', 450, 100, 40, '../../assets/characters/blob_fish_water.png'),
(2, 1, 'Мотылек', 460, 110, 45, '../../assets/characters/butterfly_water.png'),
(3, 1, 'Лягушка', 500, 120, 55, '../../assets/characters/frog_water.png'),
(4, 2, 'Митбой', 510, 140, 45, '../../assets/characters/meatboy_fire.png'),
(5, 2, 'Ящерица', 550, 150, 65, '../../assets/characters/lizard_fire.png'),
(6, 2, 'Эмобой', 530, 120, 60, '../../assets/characters/emoboy_fire.png'),
(7, 3, 'Червь', 520, 70, 55, '../../assets/characters/worm_earth.png'),
(8, 3, 'Пчела', 550, 90, 65, '../../assets/characters/bee_earth.png'),
(9, 3, 'Гриб', 500, 150, 60, '../../assets/characters/mushroom_earth.png'),
(10, 4, 'Кот Лит Энерджи', 450, 100, 40, '../../assets/characters/cat_lit_energy_air.png'),
(11, 4, 'Медведь', 490, 120, 55, '../../assets/characters/bear_air.png'),
(12, 4, 'Слон', 510, 140, 45, '../../assets/characters/elephant_air.png');

-- --------------------------------------------------------

--
-- Структура таблицы `resources`
--

CREATE TABLE `resources` (
  `id` int NOT NULL,
  `name` varchar(256) NOT NULL,
  `cost` int NOT NULL,
  `exchange_cost` int DEFAULT NULL,
  `image` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `resources`
--

INSERT INTO `resources` (`id`, `name`, `cost`, `exchange_cost`, `image`) VALUES
(1, 'Кристалл', 250, NULL, '../../assets/img/crystal.png'),
(2, 'Яйцо', 500, NULL, '../../assets/img/egg_new.png'),
(3, 'Скорлупа', 10, 50, '../../assets/img/egg_shell.png');

-- --------------------------------------------------------

--
-- Структура таблицы `skills`
--

CREATE TABLE `skills` (
  `id` int NOT NULL,
  `name` varchar(256) NOT NULL,
  `monster_type_id` int NOT NULL,
  `description` text NOT NULL,
  `damage_multiplier` float NOT NULL,
  `damage_multiplier2` float NOT NULL,
  `damage_multiplier3` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `skills`
--

INSERT INTO `skills` (`id`, `name`, `monster_type_id`, `description`, `damage_multiplier`, `damage_multiplier2`, `damage_multiplier3`) VALUES
(1, 'Ледяной шквал', 1, 'Водный покемон выпускает ледяные иглы в цель, нанося 100% урон из статистики ', 1, 0, 0),
(2, 'Каскад', 2, 'Мощный водяной поток обрушивается на цель. Если цель - покемон стихии воздуха или огня, наносится 150% от урона из статистики.', 1.5, 0, 0),
(3, 'Волна разрушений', 3, 'Сильная водная атака, которая наносит 120% урона цели и 50% от этого урона остальным покемонам в команде', 1.2, 0.5, 0.5),
(4, 'Испепеляющий удар', 4, 'Мощная огненная атака, которая наносит 140% урона и вызывает статус \"горение\", наносящий урон в 10% от урона каждую секунду на протяжении 5 секунд. ', 1.4, 0, 0),
(5, 'Пепельный взрыв', 5, 'Атакует с мощным взрывом огня, нанося 150% урона по одной цели и заставляя покемона гореть на протяжении 1 минуты. Если враг уже имеет эффект \"горения\", урон составляет 200%.', 1.5, 0, 0),
(6, 'Огненная буря', 6, ' Поднимает огненную бурю, наносящую 120% урона по всем врагам в команде. ', 1.2, 1.2, 1.2),
(7, 'Гравитационная волна', 7, 'Изменяет локальную гравитацию, увеличивая вес врагов, что наносит им 25% от урона каждую секунду на протяжении 5 секунд.', 0.25, 0.25, 0.25),
(8, 'Земной импульс', 8, 'Создает земной всплеск, который наносит урон всем врагам. Используется скилл на конкретного покемона, нанося ему на 125% от урона из статистики, а всем остальным наносится', 1.25, 1, 1),
(9, 'Тектонический удар', 9, 'Вызывает мощный сдвиг земли, который бьет по одной цели с силой 150% от урона в статистике. Шанс вызвать оглушение (10%) из-за потрясения земли. Оглушение блокирует', 1.5, 0, 0),
(10, 'Штормовой порыв', 10, 'Атакует врага мощной воздушной атакой, нанося 110% урона, с дополнительным уроном (до +30%) на водяных покемон', 1.1, 0, 0),
(11, 'Воздушный клинок', 11, 'Выпускает острую волну воздуха, наносящую 110% урона первому покемону противника, 120% урона второму и 130% урона третьему.', 1.1, 1.2, 1.3),
(12, 'Циклон разрушений', 12, 'Создает мощный воздушный вихрь, нанося 150% урона цели', 1.5, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `login` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `token` varchar(256) DEFAULT NULL,
  `name` varchar(256) NOT NULL,
  `money` int DEFAULT '0',
  `rating` int NOT NULL DEFAULT '0',
  `x` int NOT NULL DEFAULT '80',
  `y` int NOT NULL DEFAULT '45',
  `status` varchar(32) NOT NULL DEFAULT 'offline',
  `last_update` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `token`, `name`, `money`, `rating`, `x`, `y`, `status`, `last_update`) VALUES
(1, 'vasya', 'fcb03559c0317682f5d65a88aca50012', 'fb55edb42157f4641847c507b1948de2', 'Вася Пупкин', 256, 0, 70, 41, 'fight', NULL),
(2, 'petya', 'bcb209cf0d43e198e6467f8b0ac3387a', '59ffe3cbedf20e8ba4290a471f74f998', 'Пётр Петрович', 1700, 0, 70, 41, 'fight', NULL),
(3, 'masha', 'e213995da574de722a416f65b43d8314', '1916666aacbb8732bf2d12238b2cd5db', 'Маша Сергеевна', 0, 0, 80, 45, 'offline', NULL),
(4, 'test', 'нелогиньтесь', 'test', 'Тестер Тестерович', 30775, 0, 80, 45, 'offline', NULL),
(5, 'fghj', 'c05d708b03d6ce35c218e7ed35a29da4', NULL, 'dfgh', 500, 0, 80, 45, 'offline', NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `bots`
--
ALTER TABLE `bots`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `elements`
--
ALTER TABLE `elements`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `fight`
--
ALTER TABLE `fight`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `hashes`
--
ALTER TABLE `hashes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `lots`
--
ALTER TABLE `lots`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `map`
--
ALTER TABLE `map`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `map_zones`
--
ALTER TABLE `map_zones`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `monsters`
--
ALTER TABLE `monsters`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `monster_level`
--
ALTER TABLE `monster_level`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `monster_types`
--
ALTER TABLE `monster_types`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `bots`
--
ALTER TABLE `bots`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `elements`
--
ALTER TABLE `elements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `fight`
--
ALTER TABLE `fight`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `game`
--
ALTER TABLE `game`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `hashes`
--
ALTER TABLE `hashes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT для таблицы `lots`
--
ALTER TABLE `lots`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `map`
--
ALTER TABLE `map`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `map_zones`
--
ALTER TABLE `map_zones`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `monsters`
--
ALTER TABLE `monsters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `monster_level`
--
ALTER TABLE `monster_level`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `monster_types`
--
ALTER TABLE `monster_types`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
