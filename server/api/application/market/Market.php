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

    public function makeBet($userId, $userBalance, $lotInfo, $newBet){
        if ($lotInfo['status'] === 'open'){  
            if ($userId == $lotInfo['seller_id']){
                return ['error' => 3012];
            }

            if ($lotInfo['buyer_id'] == $userId && $lotInfo['current_cost'] == $newBet){
                return ['error' => 3013]; // можно сделать ставку на лот, на котором уже есть твоя ставка, только если новая ставка будет больше
            }

            if ($lotInfo['current_cost'] < $userBalance){
                if ($newBet - $lotInfo['step_cost'] >= $lotInfo['current_cost'] || $lotInfo['start_cost'] == $lotInfo['current_cost']){
                    return $this->db->makeBet($userId, $lotInfo['id'], $newBet);
                }
                return ['error' => 3014];
            }
            return ['error' => 3017];
        }
        return ['error' => 3015];
    }
}