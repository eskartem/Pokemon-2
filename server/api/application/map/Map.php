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
        $user = $this->db->getUserByToken($token);
        if (!$user) {
            return ['error' => 404]; 
        }

        if ($this->isUserInTown($user)) {
            return ['message' => 'Вы уже находитесь в городе.']; 
        }

        // Логика спавна - игрок появляется в городе, не знаю как правильно это расписать
        // $user->db-> ...= 'town'; 
        $this->db->updateUserPosition($user); // Обновляем местоположение в базе данных

        return [
            'message' => 'Вы успешно зашли в игру и появились в городе.',
        ];
    }

    public function endGame($token) {
        $user = $this->db->getUserByToken($token);
        $resources = $this->db->getAmountResourcesByUser($user);

        // 10% кусков яиц покемонов
        $eggAmount = !empty($resources['eggs']) ? 
                    $resources['eggs'][0]['resourse'] : 0;
        $eggAmount = $eggAmount * 0.1;
        //20% кристаллов стихий
        $crystalAmount = !empty($resources['crystal']) ? 
                    $resources['crystal'][0]['resourse'] : 0;
        $crystalAmount = $crystalAmount * 0.2;
        
        if (!$user) {
            return ['error' => 404]; 
        }
        // Проверяем, находится ли игрок в городе
        if (!$this->isUserInTown($user)) {
            // Игрок выходил из карты не в городе - теряет некоторые ресурсы
            $this->db->clearUserResource($user, 'eggs', $eggAmount); 
            $this->db->clearUserResource($user, 'crystal', $crystalAmount); 
            $this->db->clearUserMoney($user);
            return ['message' => 'Вы вышли из карты не в городе и потеряли некоторые ресурсы.'];
        }

        // Если игрок в городе, он ничего не теряет
        return ['message' => 'Вы успешно вышли из игры.'];

    }
}
