<?php

class Battle {

    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function getFight($fightId){
        return $this->db->getFight($fightId);
    }

    public function getInfoMonster($monsterId){
        $monster = $this->db->getMonsterById($monsterId);

        $monster_type_id = $monster->monster_type_id;
        $level = $monster->level;
        $param = $this->db->getParametersMonsterByLevel($level);
        $monster_data = $this->db->getMonsterTypeById($monster_type_id);

        $elementId = $monster_data->element_id;
        $element = $this->db->getElement($elementId);
 // Атака
        $attack_param= isset($param->attack) ? intval($param->attack) : 0;
        $attack = $monster_data->attack;
        $attack = $attack + $attack_param;
 //Защита
        $defense_param= isset($param->defense) ? intval($param->defense) : 0;
        $defense = $monster_data->defense;
        $defense = $defense + $defense_param;

        return [
            'typeId' => $monster_type_id,
            'name' => $monster_data -> name,
            'elementId' => $elementId,
            'element' => $element->name,
            'level' => $level,
            'hp' => $monster->hp,
            'attack' => $attack,
            'defense' => $defense
        ];
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
                        $fightId = $this->db->addFight($user1['id'], $user2['id']); 
                        $this->db->updateBattleHash(md5(rand()));
                        return [
                            'fightId' => $fightId,
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

    public function getDamage($monst, $damage_multiplier){//+
        $monst_type_id = $monst['monster_type_id'];
        $params = $this->db->getMonsterTypeById($monst_type_id);
        $damage = $params->hp * $damage_multiplier;
        return round($damage);
    }
    public function updateMonsterHealth($monst, $damage){//+
        if ($damage != 0){
            $monst_type_id = $monst['monster_type_id'];
            $monster_data = $this->db->getMonsterTypeById($monst_type_id);
            $defense = $monster_data->defense;
            $level = $monst['level'];
            $params = $this->db->getParametersMonsterByLevel($level);
            $defense_params = $params->defense;
            $defense = $defense + $defense_params;

            $damage = $damage - $defense;
            if ($damage >= $monst['hp']){
                $this->db->upgradeHpMonstersByUser($monst['id'], -$monst['hp']);
            }else { 
                $this->db->upgradeHpMonstersByUser($monst['id'], -$damage);
            }
        }
        return [$damage];
        
    }

public function actionUser($monsterId1, $monsterId2, $action){
        
        //monsterId1 - атакующий монстр
        $monster1 = $this->db->getMonsterById($monsterId1); 
        $monster1_type_id = $monster1->monster_type_id;
        $userId1 = $monster1->user_id;    
        $hp1 = $monster1->hp;

        //monsterId2 - монстр, который защищается
        $monster2 = $this->db->getMonsterById($monsterId2); 
        $monster2_type_id = $monster2->monster_type_id;
        $userId2 = $monster2->user_id;
        $hp = $monster2->hp;
        
        if ($userId1 === $userId2){
            return ['error' => 4000];
        }
        if ($hp1 === 0){
            return ['error' => 4001];
        }

        if ($action === 'skill'){
            //получаем скилл атакующего монстра 
            $skill = $this->db->getSkillById($monster1_type_id);
            $damage_multiplier = $skill->damage_multiplier;
            $damage_multiplier2 = $skill->damage_multiplier2;
            $damage_multiplier3 = $skill->damage_multiplier3;

            $team2 = $this->db->getMonstersByUser($userId2, 'in team'); 

            if (count($team2) === 3) {
                if ($monsterId2 === (string)$team2[0]['id']) {
                    $main_mon = $team2[0];
                    $monster_2 = $team2[1];
                    $monster_3 = $team2[2];
                } elseif ($monsterId2 === (string)$team2[1]['id']) {
                    $main_mon = $team2[1];
                    $monster_2 = $team2[0];
                    $monster_3 = $team2[2];
                } elseif ($monsterId2 === (string)$team2[2]['id']) {
                    $main_mon = $team2[2];
                    $monster_2 = $team2[0];
                    $monster_3 = $team2[1];
                }
            } elseif (count($team2) === 2) {
                if ($monsterId2 === (string)$team2[0]['id']) {
                    $main_mon = $team2[0];
                    $monster_2 = $team2[1];
                } elseif ($monsterId2 === (string)$team2[1]['id']) {
                    $main_mon = $team2[1];
                    $monster_2 = $team2[0];
                }
            } elseif (count($team2) === 1) {
                $main_mon = $team2[0];
            }
             
            $getDamage1 = 0;
            $getDamage2 = 0;
            $getDamage3 = 0;

            if ($skill->id === 2){ //+
                //проверка на стихию
                $monster2_type = $this->db->getMonsterTypeById($monster2_type_id);
                $element = $monster2_type->element_id;
                if($element === 2 || $element === 4){
                    $damage = $this->getDamage($main_mon, $damage_multiplier);
                    $getDamage1 = $this->updateMonsterHealth($main_mon, $damage);
                }  

            }elseif($skill->id === 3){//+
                $damage = $this->getDamage($main_mon, $damage_multiplier);
                $getDamage1 = $this->updateMonsterHealth($main_mon, $damage);

                if ($monster_2) { //вычитается 50% от нанесенного урона стандартному монстру, на которого напали
                    $getDamage2 = $this->updateMonsterHealth($monster_2, $damage * 0.5);
                }
                if ($monster_3) {
                    $getDamage3 = $this->updateMonsterHealth($monster_3, $damage * 0.5);
                }

            }elseif($skill->id === 4){//Горение: +10% от урона 5 секунд
                $damage = $this->getDamage($main_mon, $damage_multiplier);
                $burning = $damage * 0.5;
                $getDamage1 = $this->updateMonsterHealth($main_mon, $damage + $burning);
                
            }elseif($skill->id === 7){
                $monst_type_id = $main_mon['monster_type_id'];
                $params = $this->db->getMonsterTypeById($monst_type_id);
                $hp1 = $params->hp;
                $damage1 = $this->getDamage($main_mon, $damage_multiplier);
                $hp1 = $hp1 - $damage1;
                if ($monster_2){
                    $monst_type_id = $monster_2['monster_type_id'];
                $params = $this->db->getMonsterTypeById($monst_type_id);
                $hp2 = $params->hp;
                $damage2 = $this->getDamage($monster_2, $damage_multiplier2);
                $hp2 = $hp2 - $damage2;
                }
                if ($monster_3){
                    $monst_type_id = $monster_3['monster_type_id'];
                $params = $this->db->getMonsterTypeById($monst_type_id);
                $hp3 = $params->hp;
                $damage3 = $this->getDamage($monster_3, $damage_multiplier3);
                $hp3 = $hp3 - $damage3;
                }
                
                for ($i = 1; $i < 5; $i++){
                    $damage = round($hp1 * $damage_multiplier);
                    $hp1 = $hp1 - $damage;
                    $damage1 = $damage1 + $damage;
                    if ($monster_2) {
                        $damage = round($hp2 * $damage_multiplier2);
                        $hp2 = $hp2 - $damage;
                        $damage2 = $damage2 + $damage;
                    }
                    if ($monster_3) {
                        $damage = round($hp3 * $damage_multiplier3);
                        $hp3 = $hp3 - $damage;
                        $damage3 = $damage3 + $damage;
                    }
                }
                $getDamage1 = $this->updateMonsterHealth($main_mon, $damage1);
                if ($monster_2) {$getDamage2 = $this->updateMonsterHealth($monster_2, $damage2);}
                if ($monster_3) {$getDamage3 = $this->updateMonsterHealth($monster_3, $damage3);}
                
            }elseif($skill->id === 10){
                $monster2_type = $this->db->getMonsterTypeById($monster2_type_id);
                $element = $monster2_type->element_id;
                if($element === 1){ //если покемон водяной, то снимается урона на 30% больше
                    $damage = $this->getDamage($main_mon, $damage_multiplier + 0.3);
                    $getDamage1 = $this->updateMonsterHealth($main_mon, $damage); 
                }else{
                    $damage = $this->getDamage($main_mon, $damage_multiplier);
                    $getDamage1 = $this->updateMonsterHealth($main_mon, $damage);
                }

            }else{//+
                $damage = $this->getDamage($main_mon, $damage_multiplier);
                $getDamage1 = $this->updateMonsterHealth($main_mon, $damage);
                if ($monster_2) {
                    $damage2= $this->getDamage($monster_2, $damage_multiplier2);
                    $getDamage2 =$this->updateMonsterHealth($monster_2, $damage2);
                }
                if ($monster_3) {
                    $damage3 = $this->getDamage($monster_3, $damage_multiplier3);
                    $getDamage3 =$this->updateMonsterHealth($monster_3, $damage3);
                }
            }
            return[
                'monsterId1' => $main_mon['id'],
                'damage1' => $getDamage1,
                'monsterId2' => $monster_2['id'],
                'damage2' => $getDamage2,
                'monsterId3' => $monster_3['id'],
                'damage3' => $getDamage3
            ];
            
            //skill id = 4-5 эффект горения
            //skill id = 9 эффект оглушения

        }elseif($action === 'attack'){

            $level1 = $monster1->level;
            $param1 = $this->db->getParametersMonsterByLevel($level1);
            $attack_param= isset($param1->attack) ? intval($param1->attack) : 0;
            
            $monster1_data = $this->db->getMonsterTypeById($monster1_type_id);
            $attack = $monster1_data->attack;
            $attack = $attack + $attack_param;

            $monster2_data = $this->db->getMonsterTypeById($monster2_type_id);
            $defense = $monster2_data->defense;
            $level2 = $monster2->level;
            $param2 = $this->db->getParametersMonsterByLevel($level2);
            $defense_params = $param2->defense;
            $defense = $defense + $defense_params;
            
            
            //нанесенный урон при атаке (атака - защита = урон)
            $damageDone = $attack - $defense; 
            if ($hp < $damageDone){
                $this->db->upgradeHpMonstersByUser($monsterId2, -$hp);
            }else{
                $this->db->upgradeHpMonstersByUser($monsterId2, -$damageDone);
            }

            return [
                'monsterId' => $monsterId2,
                'damage' => $damageDone
            ];

        }elseif($action === 'escape'){

            $escapeChance = rand(1, 100);
            
            if ($escapeChance <= 10) {
                //теряет 5% монет
                $money1 = $this->db->getMoneyByUser($userId1);
                $money1 = isset($money1->money) ? intval($money1->money) : 0;
                $money = $money1 * 0.05;
                $this->db->updateMoneyByUser($userId1, $money1 - $money);
                //теряет 5% кристаллов  
                $amountCrystal1 = $this->db->getAmountCrystalByUser($userId1);
                $amountCrystal1 = isset($amountCrystal1->resource_amount) ? intval($amountCrystal1->resource_amount) : 0;
                $amountCrystal = $amountCrystal1 * 0.05;
                $this->db->clearUserResource($userId1, 1, $amountCrystal);
                $this->db->updateUserStatus($userId1, 'scout');
                return [
                    'lostMonye'=> $money,
                    'lostCrystal' => $amountCrystal
                ];
            }else{
                return [false];
            }
        }
    }

    public function getQueue($fightId, $queue){

        $fight = $this->db->getFight($fightId);
        if ($fight->status === 'close'){
            return['error' => 4002];
        }

        //$queue = [1,2,3,4,5,6];

        for ($i = 0; $i <= 5; $i++){
            $monster = $this->db->getMonsterById($queue[$i]);
            if ($monster || $queue[$i] === 0){
                if($monster->hp === 0){
                    $queue[$i] = 0;
                }
            } else{
                return ['error' => 702];
            }
        }

        $queue1 = $queue[1];
        $queue2 = $queue[2];
        $queue3 = $queue[3];
        $queue4 = $queue[4];
        $queue5 = $queue[5];
        $queue6 = $queue[0];

        $this->db->updateQueue($fight->id, $queue1, $queue2, $queue3, $queue4, $queue5, $queue6);

        return[
            'queue' =>
            [$queue1,
            $queue2,
            $queue3,
            $queue4,
            $queue5,
            $queue6]
        ];
    }
}