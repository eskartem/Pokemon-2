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
        
        $this->db->updateUserStatus($user->id, 'offline');
        return true;
    }

    public function moveUser($id, $x, $y) {
        return $this->db->updateUserLocation($id, $x, $y);
    }
}