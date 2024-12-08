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
    public function  actionUser($monsterId1, $monsterId2, $action){
        //$user = $this->db->getUserByToken($token);

        //monsterId1 - атакующий монстр
        $monster1 = $this->db->getMonsterById($monsterId1); 
        $monster1_type_id = $this->db->getMonsterTypeByMonsters($monsterId1);
        $userId =  isset($monster1->user_id) ? intval($monster1->user_id) : 0;

        //monsterId2 - монстр, который защищается
        $monster2 = $this->db->getMonsterById($monsterId2); 
        $monster2_type_id = $this->db->getMonsterTypeByMonsters($monsterId2);
        $hp = $this->db->getMonsterHpById($monsterId2);
        $hp = isset($hp->hp) ? intval($hp->hp) : 0;

        if ($action == 'skill'){
            //как расписать скилы я не знаю
        }elseif($action == 'attack'){

            $level = $this->db->getMonsterLevelById($monsterId1);
            $param = $this->db->getParametersMonsterByLevel($level);
            $attack_param= isset($param['attack']->attack) ? intval($param['attack']->attack) : 0;
            $monster1_data = $this->db->getMonsterTypeById($monster1_type_id);
            $attack = isset($monster1_data['attack']->attack) ? intval($monster1_data['attack']->attack) : 0;
            $attack = $attack + $attack_param;

            $monster2_data = $this->db->getMonsterTypeById($monster2_type_id);
            $defense = isset($monster2_data['defense']->defense) ? intval($monster2_data['defense']->defense) : 0;

            
            //нанесенный урон при атаке (атака - защита = урон)
            $damageDone = $attack - $defense; 
            if ($hp < $damageDone){
                $this->db->upgradeHpMonstersByUser($monsterId2, -$hp);
            }else{
                $this->db->upgradeHpMonstersByUser($monsterId2, -$damageDone);
            }

            return false;

        }elseif($action == 'escape'){

            $escapeChance = rand(1, 100);
            if ($escapeChance <= 10) {
                $this->db->updateUserStatus($userId, 'scout');
            }else{
                return false;
            }
        }





    }


}