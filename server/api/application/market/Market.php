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

    public function buy($userId, $userBalance, $buyType, $purchaseId, $lotInfo){
        if ($lotInfo->status === 'open'){       
            if ($lotInfo->current_cost < $userBalance){
                if ($buyType === 'pokemon'){
                    //return $this->db->buyPokemon($user->id, $params['id'])
                }
                if ($buyType === 'item'){
                    //return ['check'];
                    //return $this->db->buyItem($user->id, $params['id'])
                }
            }
            return ['error' => 3003];
        }
        return ['error' => 3005];
    }
}