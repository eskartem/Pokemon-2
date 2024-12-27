<?php

class Battle {

    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function updateResourcesOnVictoryAndLoss($winnerId, $loserId){
        //loser
        $this->db->updateUserLocation($loserId, 80, 45);

        /*20% кристаллов стихий*/
        $amountCrystal1 = $this->db->getAmountCrystalByUser($loserId);
        $amountCrystal1 = isset($amountCrystal1->resource_amount) ? intval($amountCrystal1->resource_amount) : 0;
        $amountCrystal = $amountCrystal1 * 0.2;
        $this->db->clearUserResource($loserId, 1, $amountCrystal);

        /*10% покемонов (забираются имеющиеся куски яиц покемонов */
        $amountEggsFragm1 = $this->db->getAmountEggsFragmentByUser($loserId);
        $amountEggsFragm1 = isset($amountEggsFragm1->resource_amount) ? intval($amountEggsFragm1->resource_amount) : 0;
        $amountEggsFragm = $amountEggsFragm1 * 0.1;
        $this->db->clearUserResource($loserId, 3, $amountEggsFragm);
        
        /*30% монет*/
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

    public function restoreHp($monsterId){
        $monster = $this->db->getMonsterById($monsterId);
        if ($monster->hp != 0){
        $this->db->upgradeHpMonstersByUser($monsterId, -$monster->hp); 
        }
        $monster_type_id = $monster->monster_type_id;
        $monster_type = $this->db->getMonsterTypeById($monster_type_id);
        $hp = $monster_type->hp;
            
        $level = $monster->level;
        for ($i = 2; $i <= $level; $i++){
            $params = $this->db->getParametersMonsterByLevel($i);
            $hp_params = $params->hp;
            $hp = $hp + $hp_params;
        }
    
        $this->db->upgradeHpMonstersByUser($monsterId, $hp); 
        
    }

    public function skills($monster_type_id){}


    public function startBattle() {
        $players = $this->db->getPlayersScout(); // все игроки со статусом скаут
        if (count($players) === 1){
            return [false];
        }
        // Итерируем по всем игрокам
        for ($i = 0; $i < count($players); $i++) {
            for ($j = $i + 1; $j < count($players); $j++) {
                $user1 = $players[$i];
                $user2 = $players[$j];

                // Проверяем совпадают ли координаты
                if ($user1['x'] === $user2['x'] && $user1['y'] === $user2['y']) {
                    //проверка на безопасную зону
                    if ($user1['x'] <= 57 || $user1['x'] >= 90 ||
                    $user1['y'] <= 43 || $user1['y'] >= 51 ){
                        $this->db->updateUserStatus($user1['id'], 'fight');
                        $this->db->updateUserStatus($user2['id'], 'fight');
                        $this->db->addFight($user1['id'], $user2['id']); 
                        $this->db->updateBattleHash(md5(rand()));
                        return [
                            'user1' => $user1['id'],
                            'user2' => $user2['id']
                        ];
                    }   
                }
            }
        }return [false];
    }
    
    public function updateBattle($hash){// loop //получаю данные по всем игрокам
        $currentHash = $this->db->getHash();
        if ($hash === $currentHash->battle_hash) {
            return [
                'hash' => $hash
            ];
        }
        $playersInBattle = $this->db->getPlayersInBattle();
        return [
            'gamers' => $playersInBattle,
            'hash' => $currentHash->battle_hash
        ];
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
            foreach ($monsters1 as $monster1){
                $this->restoreHp($monster1['id']);
            }
            foreach ($monsters2 as $monster2){
                $this->restoreHp($monster2['id']);
            }
            return [
                'tokenWinner' => $token2,
                'tokenLoser' => $token1
            ];
        }elseif($allDead2) {
            $this->updateResourcesOnVictoryAndLoss($user1->id, $user2->id);
            $this->db->addResultFight($user1->id, $user2->id, $user1->id);
            foreach ($monsters1 as $monster1){
                $this->restoreHp($monster1['id']);
            }
            foreach ($monsters2 as $monster2){
                $this->restoreHp($monster2['id']);
            }
            return [
                'tokenWinner' => $token1,
                'tokenLoser' => $token2
            ];
        }else {
            return [false];
        }

    }

    public function actionUser($monsterId1, $monsterId2, $action){
        //monsterId1 - атакующий монстр
        $monster1 = $this->db->getMonsterById($monsterId1); 
        $monster1_type_id = $monster1->monster_type_id;
        $userId = $monster1->user_id;

        //monsterId2 - монстр, который защищается
        $monster2 = $this->db->getMonsterById($monsterId2); 
        $monster2_type_id = $monster2->monster_type_id;
        $hp = $monster2->hp;
        
        if ($action === 'skill'){
            //$this->skills($monster_type_id);
        }elseif($action === 'attack'){

            $level = $monster1->level;
            $param = $this->db->getParametersMonsterByLevel($level);
            $attack_param= isset($param->attack) ? intval($param->attack) : 0;
            
            $monster1_data = $this->db->getMonsterTypeById($monster1_type_id);
            $attack = $monster1_data->attack;
            $attack = $attack + $attack_param;

            $monster2_data = $this->db->getMonsterTypeById($monster2_type_id);
            $defense = $monster2_data->defense;

            
            //нанесенный урон при атаке (атака - защита = урон)
            $damageDone = $attack - $defense; 
            if ($hp < $damageDone){
                $this->db->upgradeHpMonstersByUser($monsterId2, -$hp);
            }else{
                $this->db->upgradeHpMonstersByUser($monsterId2, -$damageDone);
            }

            return true;

        }elseif($action === 'escape'){

            $escapeChance = rand(1, 100);
            
            if ($escapeChance <= 10) {
                //теряет 5% монет
                $money1 = $this->db->getMoneyByUser($userId);
                $money1 = isset($money1->money) ? intval($money1->money) : 0;
                $money = $money1 * 0.05;
                $this->db->updateMoneyByUser($userId, $money1 - $money);
                //теряет 5% кристаллов  
                $amountCrystal1 = $this->db->getAmountCrystalByUser($userId);
                $amountCrystal1 = isset($amountCrystal1->resource_amount) ? intval($amountCrystal1->resource_amount) : 0;
                $amountCrystal = $amountCrystal1 * 0.05;
                $this->db->clearUserResource($userId, 1, $amountCrystal);
                $this->db->updateUserStatus($userId, 'scout');
                return [true];
            }else{

                return [false];
            }
        }
    }
}