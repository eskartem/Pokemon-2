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

    public function moveUser($userId, $direction, $currentX, $currentY) {
        $mapData = $this->getMap();
        if (!isset($mapData['MAP']['WIDTH'], $mapData['MAP']['HEIGHT']) || !is_array($mapData)) {
            return ['error' => 850];
        }
    
        $borders = [
            'width' => $mapData['MAP']['WIDTH'],
            'height' => $mapData['MAP']['HEIGHT']
        ];

        $dx = 0;
        $dy = 0;
        switch ($direction) {
            case 'left':  $dx = -1; break;
            case 'right': $dx = 1; break;
            case 'up':    $dy = -1; break;
            case 'down':  $dy = 1; break;
        }
 
        $newX = $currentX + $dx;
        $newY = $currentY + $dy;

        if ($newX < 0 || $newX > $borders['width'] || $newY < 0 || $newY > $borders['height']) {
            return ['error' => 2003];
        }

        $this->db->updateMapHash(md5(rand()));
        return $this->db->moveUser($userId, $newX, $newY);
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
            'gamers' => $playersIngame,
            'hash' => $currentHash->map_hash
        ];
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