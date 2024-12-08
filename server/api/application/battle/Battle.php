<?php

class Battle {

    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function updateResourcesOnVictoryAndLoss($winnerId, $loserId){
        //loser
        $this->db->updateUserLocation($loserId, 80, 45);

        /* 30% монет, 10% покемонов (забираются имеющиеся куски яиц покемонов 
        или понижаются уровни самих покемон) и 20% кристаллов стихий*/
        $amountCrystal1 = $this->db->getAmountCrystalByUser($loserId);
        $amountCrystal1 = isset($amountCrystal1->resource_amount) ? intval($amountCrystal1->resource_amount) : 0;
        $amountCrystal = $amountCrystal1 * 0.2;
        $this->db->clearUserResource($loserId, 1, $amountCrystal);
        
        $amountEggsFragm1 = $this->db->getAmountEggsFragmentByUser($loserId);
        $amountEggsFragm1 = isset($amountEggsFragm1->resource_amount) ? intval($amountEggsFragm1->resource_amount) : 0;
        $amountEggsFragm = $amountEggsFragm1 * 0.1;
        $this->db->clearUserResource($loserId, 3, $amountEggsFragm);
        
        $money1 = $this->db->getMoneyByUser($loserId);
        $money1 = isset($money1->money) ? intval($money1->money) : 0;
        $money = $money1 * 0.3;
        $this->db->updateMoneyByUser($loserId, $money1 - $money); 
                    
        $this->db->updateUserStatus($loserId, 'scout');
        
        //winner
        $this->db->clearUserResource($winnerId, 1, -$amountCrystal);
        $this->db->clearUserResource($winnerId, 3, -$amountEggsFragm);
        $money2 = $this->db->getMoneyByUser($winnerId);
        $money2 = isset($money2->money) ? intval($money2->money) : 0;

        $this->db->updateMoneyByUser($winnerId, $money2 + $money);
        $this->db->updateUserStatus($winnerId, 'scout');
    }


    public function updateBattle(){// loop //получаю данные по всем игрокам

    } 

    public function endBattle($token1, $token2){
        //первый игрок
        $user1 = $this->db->getUserByToken($token1);
        $allDead1 = true;
        $monsters1 = $this->db->getMonstersByUser($user1->id, 'in team');
        
        //второй игрок
        $user2 = $this->db->getUserByToken($token2);
        $allDead2 = true;
        $monsters2 = $this->db->getMonstersByUser($user2->id, 'in team');

        foreach ($monsters1 as $monster1) {
            if ($monster1['hp'] > 0) {
                $allDead1 = false; // Если хотя бы один жив, устанавливаем в false
            } else {
                $this->db->updateMonsterStatus($monster1['id'], 'in pocket'); 
            }
        }
        foreach ($monsters2 as $monster2) {
            if ($monster2['hp'] > 0) {
                $allDead2 = false;
            } else {
                $this->db->updateMonsterStatus($monster2['id'], 'in pocket');
            }
        }

        if ($allDead1) {
            $this->updateResourcesOnVictoryAndLoss($user2->id, $user1->id);
            $this->db->addResultFight($user1->id, $user2->id, $user2->id);
            return ['message' => 'Проиграл 1 игрок'];
        }elseif($allDead2) {
            $this->updateResourcesOnVictoryAndLoss($user1->id, $user2->id);
            $this->db->addResultFight($user1->id, $user2->id, $user1->id);
            return ['message' => 'Проиграл 2 игрок'];
        }

    }
    
    public function  actionUser($token, $monsterId, $action){
        $user = $this->db->getUserByToken($token);      
        $monster = $this->db->getMonsterById($monsterId); 



    }

}