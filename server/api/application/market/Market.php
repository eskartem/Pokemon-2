<?php

class Market {

    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function getAllLots($isInTown) {
        if ($isInTown) {
            return $this->db->getAllLots();
        }
        return ['error' => 2999];
    }

    public function makeLotMonster($user, $sellingItemId, $startCost, $stepCost) {
        $zalog = (int)$startCost / 100 * 5; // 5%
        $zalog = ceil($zalog);

        if ($user->money < $zalog){
            return ['error' => 802];
        }

        if ($zalog < 5){
            $zalog = 5; 
        }

        return $this->db->makeLotMonster($user->id, $sellingItemId, $startCost, $stepCost, $zalog);
    }

    public function makeLotItem($user, $sellingItemId, $startCost, $stepCost, $amount) {
        $zalog = (int)$startCost / 100 * 5; // 5%
        $zalog = ceil($zalog);

        if ($user->money < $zalog){
            return ['error' => 802];
        }

        if ($zalog < 5){
            $zalog = 5; 
        }

        return $this->db->makeLotItem($user->id, $sellingItemId, $startCost, $stepCost, $amount, $zalog);
    }

}