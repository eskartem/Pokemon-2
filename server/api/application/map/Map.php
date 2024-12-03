<?php

class Map {

    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function isUserInZone($user, $zoneName) {
        $mapData = $this->getMap();
        $mapZone = $mapData['mapZones'];
        foreach ($mapZone as $zone){
            if ($zone['name'] === $zoneName){
                if ($user->x >= $zone['x'] && $user->x <= $zone['x'] + $zone['width'] && 
                    $user->y >= $zone['y'] && $user->y <= $zone['y'] + $zone['height']){
                    return true;
                }
            }
        }
        return false;
    }

    public function getMap() {
        $result = $this->db->getMap();
        $map = $result['map'];
        $map_zones = $result['map_zones'];
        return [
            'MAP' => ['WIDTH' => $map->width, 'HEIGHT' => $map->height, 'IMAGE' => $map->image],
            'mapZones' => $map_zones
        ];
    }
    
    public function startGame($token) {
        $user = $this->db->getUserByToken($token);
        if (!$user) {
            return ['error' => 705]; 
        }
        
        if ($this->isUserInTown($user)) {
            return ['message' => 'Вы уже находитесь в городе.']; 
        }
 
        //обновление статуса (разведчик)
        $this->db->updateUserStatus($user, 'scout'); 

        return [
            $this->db->getMonstersByUser($user, 'in team'),
            'message' => 'Вы успешно зашли в игру и появились в городе.',
        ];
    }

    public function endGame($token) {
        $user = $this->db->getUserByToken($token);
        if (!$user) {
            return ['error' => 705]; 
        }

        $resources = $this->db->getAmountResourcesByUser($user);

        // 10% кусков яиц покемонов
        $eggAmount = !empty($resources['eggs']) ? 
                    $resources['eggs'][0]['resourse'] : 0;
        $eggAmount = $eggAmount * 0.1;
        //20% кристаллов стихий
        $crystalAmount = !empty($resources['crystal']) ? 
                    $resources['crystal'][0]['resourse'] : 0;
        $crystalAmount = $crystalAmount * 0.2;
        
        $having_money = $this->db->getMoneyByUser($user);
        $money = $having_money - ($having_money * 0.3);

        // Проверяем, находится ли игрок в городе
        if (!$this->isUserInTown($user)) {
            // Игрок выходил из карты не в городе - теряет некоторые ресурсы
            $this->db->clearUserResource($user, 'eggs', $eggAmount); 
            $this->db->clearUserResource($user, 'crystal', $crystalAmount); 
            $this->db->clearUserMoney($user, $money);
            return [
                true,
                'message' => 'Вы вышли из карты не в городе и потеряли некоторые ресурсы.'
            ];
        }

        $this->db->updateUserStatus($user, 'offline');
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