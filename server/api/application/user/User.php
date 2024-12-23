<?php

class User {
    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function getUser($token) {
        // проверять активность игроков и 
        // менять им статус на offline в случае отсутствия оной
        //...
        return $this->db->getUserByToken($token);
    }

    public function getMonster($monsterId){
        return $this->db->getMonsterById($monsterId);    
    }

    public function login($login, $hash, $rnd) {
        $user = $this->db->getUserByLogin($login);
        if ($user) {
            if (md5($user->password . $rnd) === $hash) {
                $token = md5(rand());
                $this->db->updateToken($user->id, $token);
                $this->db->updateMapHash(md5(rand()));
                $this->db->updateUserStatus($user->id, 'scout'); 
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'token' => $token,
                    'x' => $user->x,
                    'y'=> $user->y,
                ];
            }
            return ['error' => 1002];
        }
        return ['error' => 1005];
    }

    public function logout($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $this->db->updateToken($user->id, null);
            $this->db->updateMapHash(md5(rand()));
            $this->db->updateUserStatus($user->id, 'offline');
            return true;
        }
        return ['error' => 1003];
    }

    public function registration($login, $password, $name) {
        $user = $this->db->getUserByLogin($login, $password);
        if ($user) {
            return ['error' => 1001];
        }
        $this->db->registration($login, $password, $name);
        $user = $this->db->getUserByLogin($login, $password);
        if ($user) {
            $token = md5(rand());
            $this->db->updateToken($user->id, $token);
            $this->db-> addInventoryByUser($user->id);
            $this->db->updateMoneyByUser($user->id, 500);
            $this->db->updateUserStatus($user->id, 'scout'); 

            //добавление покемонов
            $monster_type_id1 = rand(1,4);
            $monster_type_id2 = rand(5,8);
            $monster_type_id3 = rand(9,12);
                        
            $this->db->addMonsters($user->id, $monster_type_id1);
            $this->db->addMonsters($user->id, $monster_type_id2);
            $this->db->addMonsters($user->id, $monster_type_id3);
            
            return [
                'id' => $user->id,
                'name' => $user->name,
                'token' => $token,
            ];
        }
        return ['error' => 1004];
    }

    //Gamer Info
    public function userInfo($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            return [
                $user,
                $this->db-> getMonstersByUser($user->id),
                $this->db-> getInventoryByUser($user->id)
            ];
        }
        return ['error' => 404]; 
    }

    public function upgradePokemon($token, $monsterId) {
        $user = $this->db->getUserByToken($token);
        
        //узнаем уровень покемона
        $levelMonster = $this->db->getMonsterLevelById($monsterId);
        $levelMonster = isset($levelMonster->level) ? intval($levelMonster->level) : 0;
        $level = $levelMonster + 1;

        $param = $this->db->getParametersMonsterByLevel($level);
      //узнаем id типа монстра
        $monster_type_id = $this->db->getMonsterTypeByMonsters($monsterId);
        $monster_type_id = isset($monster_type_id->monster_type_id) ? intval($monster_type_id->monster_type_id) : 0;
        
        //узнаем скок кристалов у пользака определенной стихии 
        $resources = $this->db->getAmountCrystalByUser($user->id);    
        $crystalAmount = isset($resources->resource_amount) ? intval($resources->resource_amount) : 0;
        
        if ($levelMonster === 5) {
            return ['error' => 703 ]; 
        } elseif ($crystalAmount >= $param->cost) {
            $amount = $param->cost;
        } else {
            return ['error' => 802 ];
        }

        $resourceTypeId = 1;
        //вычитаем ресурсы
        $this->db->clearUserResource($user->id, $resourceTypeId, $amount);
        //увеливаем уровень
        $this->db->upgradeLevelMonstersByUser($monsterId);
        
        $hp_param = $param->hp;
        
        //увеличиваем hp 
        $this->db->upgradeHpMonstersByUser($monsterId, $hp_param);
        
        $hp = $this->db->getMonsterHpById($monsterId);
        

        return[
            $this->db->getMonsterLevelById($monsterId),
            $hp
        ];
    }

}