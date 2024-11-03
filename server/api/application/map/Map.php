<?php

class Map {

    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function isUserInTown($user) {
        return true; // просто заглушка
    }

    public function startGame($token) {
        // Получаем пользователя по токену
        $user = $this->db->getUserByToken($token);
        if (!$user) {
            return ['error' => 404]; 
        }

        if ($this->isUserInTown($user)) {
            return ['message' => 'Вы уже находитесь в городе.']; 
        }

        // Логика спавна - игрок появляется в городе
        $user->position = 'town'; 
        $this->db->updateUserPosition($user); // Обновляем местоположение в базе данных

        return [
            'message' => 'Вы успешно зашли в игру и появились в городе.',
            'position' => $user->position
        ];
    }

}