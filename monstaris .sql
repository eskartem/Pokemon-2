-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 11 2024 г., 23:06
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
(1, 'вода', 2, 3),
(2, 'огонь', 4, 1),
(3, 'земля', 1, 4),
(4, 'воздух', 3, 2);

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
  `result` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `fight`
--

INSERT INTO `fight` (`id`, `user1_id`, `user2_id`, `turn`, `status`, `result`) VALUES
(1, 1, 2, 1, 'close', 2),
(2, 1, 2, 0, 'open', 0);

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
  `market_hash` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `hashes`
--

INSERT INTO `hashes` (`id`, `chat_hash`, `map_hash`, `battle_hash`, `market_hash`) VALUES
(1, '853d7d057cda9930114b47ae3578f139', '', '0', 0);

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
(1, 2, 1, 100),
(2, 2, 2, 100),
(3, 2, 3, 100),
(4, 1, 1, 100),
(13, 1, 2, 100),
(14, 1, 3, 100);

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
  `timestamp_cost` int NOT NULL,
  `buyer_id` int DEFAULT NULL,
  `status` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `lots`
--

INSERT INTO `lots` (`id`, `seller_id`, `datetime`, `start_cost`, `step_cost`, `current_cost`, `timestamp_cost`, `buyer_id`, `status`) VALUES
(1, 2, '2024-12-04 20:27:15', 1000, 100, 1300, 100, 1, 'closed'),
(2, 2, '2024-12-04 20:49:25', 100, 25, 250, 30, 1, 'open');

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
(1, 'карта', 160, 90, '');

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
(1, 1, 'город', 80, 45, 12, 12, 'town', NULL);

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
(6, 1, 'ljskjhdfg', '2024-11-13 07:23:07');

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
(1, 2, 1, 2, 0, 'in team'),
(2, 1, 2, 5, 23, 'in team'),
(3, 2, 2, 5, 0, 'in team'),
(4, 1, 3, 3, 0, 'in team'),
(5, 1, 2, 3, 0, 'in team'),
(6, 2, 3, 2, 0, 'in team');

-- --------------------------------------------------------

--
-- Структура таблицы `monster_level`
--

CREATE TABLE `monster_level` (
  `id` int UNSIGNED NOT NULL,
  `level` int NOT NULL,
  `attack` int NOT NULL,
  `hp` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Стандартное увеличение характеристик покемонов при улучшении';

--
-- Дамп данных таблицы `monster_level`
--

INSERT INTO `monster_level` (`id`, `level`, `attack`, `hp`) VALUES
(1, 2, 40, 90),
(2, 3, 70, 110),
(3, 4, 120, 150),
(4, 5, 200, 270);

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
  `defense` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `monster_types`
--

INSERT INTO `monster_types` (`id`, `element_id`, `name`, `hp`, `attack`, `defense`) VALUES
(1, 1, 'Magikarp ', 450, 100, 40),
(2, 1, 'Omanyte ', 460, 110, 45),
(3, 1, 'Poliwhirl ', 500, 120, 55),
(4, 2, 'Flareon', 510, 140, 45),
(5, 2, 'Growlithe', 550, 150, 65),
(6, 2, 'Ponyta ', 530, 120, 60),
(7, 3, 'Dugtrio ', 520, 70, 55),
(8, 3, 'Sandshrew ', 550, 90, 65),
(9, 3, 'Bulbasaur ', 500, 150, 60),
(10, 4, 'Farfetch\'d', 450, 100, 40),
(11, 4, 'Zubat ', 490, 120, 55),
(12, 4, 'Butterfree', 510, 140, 45);

-- --------------------------------------------------------

--
-- Структура таблицы `resources`
--

CREATE TABLE `resources` (
  `id` int NOT NULL,
  `name` varchar(256) NOT NULL,
  `cost` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `resources`
--

INSERT INTO `resources` (`id`, `name`, `cost`) VALUES
(1, 'Кристалл', 250),
(2, 'Яйцо', 500),
(3, 'Скорлупа', 10);

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
  `status` varchar(32) NOT NULL DEFAULT 'offline'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `token`, `name`, `money`, `rating`, `x`, `y`, `status`) VALUES
(1, 'vasya', 'fcb03559c0317682f5d65a88aca50012', '4fcf529e134fdda1a82c49f838e647a0', 'Вася Пупкин', 83, 0, 80, 45, 'scout'),
(2, 'petya', 'bcb209cf0d43e198e6467f8b0ac3387a', 'bbb3c25e58da6532b19de0acb594f6c1', 'Пётр Петрович', 118, 0, 80, 45, 'scout'),
(3, 'masha', 'e213995da574de722a416f65b43d8314', '1916666aacbb8732bf2d12238b2cd5db', 'Маша Сергеевна', 0, 0, 80, 45, 'offline'),
(5, 'test', 'df72c1ad71c8243e5f16675a02371c3e', NULL, 'test', 500, 0, 80, 45, 'offline');

--
-- Индексы сохранённых таблиц
--

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
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `elements`
--
ALTER TABLE `elements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `fight`
--
ALTER TABLE `fight`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `lots`
--
ALTER TABLE `lots`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `map`
--
ALTER TABLE `map`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `map_zones`
--
ALTER TABLE `map_zones`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `monsters`
--
ALTER TABLE `monsters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `monster_level`
--
ALTER TABLE `monster_level`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `monster_types`
--
ALTER TABLE `monster_types`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
