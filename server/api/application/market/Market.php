<?php

class Market {

    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function getCatalog($isInTown) {
        if ($isInTown) {
            return $this->db->getCatalog();
        }
        return ['error', 2001];
    }

    public function getLot($lotId) {
        return $this->db->getLotByLotId($lotId);
    }

    public function buy($userId, $userBalance, $lotInfo, $newBet){
        if ($lotInfo->status === 'open'){       
            if ($lotInfo->current_cost < $userBalance){
                return $this->db->setNewBet($userId, $lotInfo, $newBet);
            }
            return ['error' => 3003];
        }
        return ['error' => 3005];
    }
}