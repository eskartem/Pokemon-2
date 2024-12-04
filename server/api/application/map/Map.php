<?php

class Map {

    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function isUserInTown($user) {
        return true; // просто заглушка
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
    
    /*public function startGame($token) {
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
    }*/

    public function moveUser($id, $x, $y) {
        return $this->db->updateUserLocation($id, $x, $y);
    }
}