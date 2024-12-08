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
        $zalog = (int)$params['startCost'] / 100 * 5; // 5%
        if ($user->money < $zalog){
            return ['error' => 's'];
        } 

        return $this->db->makeLotMonster($user->id, $sellingItemId, $startCost, $stepCost);
    }

}