<?php

class Map {

    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function isUserInTown($user) {
        return true; // просто заглушка
    }


    public function getMap($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $mapData = $this->db->getMap();
            //хз, имеет ли вообще смысл писать этот кал, просто хочется чтобы к бд обращались только внутри класса DB
            if ($mapData) {
                return $mapData;
            } else {
                return ['error' => 9000, 'message' => 'Карта не найдена.'];
            }
        }
        return ['error' => 9000, 'message' => 'Зарегестрируйтесь или войдите для просмотра карты.'];
    }
    
    public function startGame($token) {
        $user = $this->db->getUserByToken($token);
        //обновление статуса (разведчик)
        $this->db->updateUserStatus($user->id, 'scout'); 
        return [
            $user,
            $this->db->getMonstersByUser($user->id),
            $this->db->getInventoryByUser($user->id)
        ];
    }

    public function endGame($token) {
        
        $user = $this->db->getUserByToken($token);
        $resources = $this->db->getAmountResourcesByUser($user->id);

        // 10% кусков яиц покемонов
        $eggAmount = !empty($resources['eggs']) ? 
                    $resources['eggs'][0]['resourse'] : 0;
        $eggAmount = $eggAmount * 0.1;
        //20% кристаллов стихий
        $crystalAmount = !empty($resources['crystal']) ? 
                    $resources['crystal'][0]['resourse'] : 0;
        $crystalAmount = $crystalAmount * 0.2;
        
        $having_money = $this->db->getMoneyByUser($user->id);
        $money = $having_money - ($having_money * 0.3);

        // Проверяем, находится ли игрок в городе
        if (!$this->isUserInTown($user)) {
            // Игрок выходил из карты не в городе - теряет некоторые ресурсы
            $this->db->clearUserResource($user->id, 'eggs', $eggAmount); 
            $this->db->clearUserResource($user->id, 'crystal', $crystalAmount); 
            $this->db->clearUserMoney($user->id, $money);
            return [
                true,
                'message' => 'Вы вышли из карты не в городе и потеряли некоторые ресурсы.'
            ];
        }

        $this->db->updateUserStatus($user->id, 'offline');
        // Если игрок в городе, он ничего не теряет
        return [
            true, 
            'message' => 'Вы успешно вышли из игры.'
        ];

    }

    public function moveUser($id, $x, $y) {
        return $this->db->updateUserLocation($id, $x, $y);
    }
}