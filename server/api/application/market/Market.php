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

    public function buy($userId, $userBalance, $buyType, $purchaseId){

        if ($buyType === 'pokemon'){
            $lots = $this->db->getLotsByPurchaseId($purchaseId);
            //return $this->db->buyPokemon($user->id, $params['id'])
        }

        if ($buyType === 'item'){
            //return $this->db->buyItem($user->id, $params['id'])
        }

        //$this->market->buyItem($user->id, $params['id']);
    }

}