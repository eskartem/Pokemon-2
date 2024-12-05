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

    public function updateScene($hash) {
        $currentHash = $this->db->getHash();
        if ($hash === $currentHash->map_hash) {
            return [
                'hash' => $hash
            ];
        }
        $playersIngame = $this->db->getPlayersIngame();
        return [
            'playersIngame' => $playersIngame,
            'hash' => $currentHash->map_hash
        ];
    }
}