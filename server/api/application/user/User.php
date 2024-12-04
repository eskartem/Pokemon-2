<?php

class User {
    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function getUser($token) {
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
                $this->db->updateUserStatus($user->id, 'scout'); 
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'token' => $token,
                    'coins' => $user->coins,
                    'crystals' => $user->crystals,
                    'eggFragments' => $user->egg_fragments,
                    'x' => $user->x,
                    'y'=> $user->y,
                    $this->db->getMonstersByUser($user->id),
                    $this->db->getInventoryByUser($user->id)
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
            $this->db->updateUserStatus($user->id, 'scout'); 
            return [
                'id' => $user->id,
                'name' => $user->name,
                'token' => $token,
                'coins' => $user->coins,
                'crystals' => $user->crystals,
                'eggFragments' => $user->egg_fragments,
                $this->db->getMonstersByUser($user->id),
                $this->db->getInventoryByUser($user->id)
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
    
      //узнаем id типа монстра
        $monster_type_id = $this->db->getMonsterTypeByMonsters($monsterId);
        $monster_type_id = isset($monster_type_id->monster_type_id) ? intval($monster_type_id->monster_type_id) : 0;
    
        //Получаем id стихии, которая принадлежит покемону
        //$element_id = $this->db->getElementByMonsters($monster_type_id);
        //$element_id = isset($element_id->element_id) ? intval($element_id->element_id) : 0;
    
        //узнаем скок кристалов у пользака определенной стихии 
        $resources = $this->db->getAmountCrystalByUser($user->id);    
        $crystalAmount = isset($resources->resource) ? intval($resources->resource) : 0;

        if ($levelMonster === 1 && $crystalAmount >= 10) {
            $amount = 10; 
        } elseif ($levelMonster === 2 && $crystalAmount >= 20) {
            $amount = 20;
        } elseif ($levelMonster === 3 && $crystalAmount >= 100) {
            $amount = 100;
        } elseif ($levelMonster === 4 && $crystalAmount >= 500) {
            $amount = 500;
        } elseif ($levelMonster === 5) {
            return ['error' => 703 ];
        } else {
            return ['error' => 802 ];
        }

        $resourceTypeId = 1;
        //вычитаем ресурсы
        $this->db->clearUserResource($user->id, $resourceTypeId, $amount);
        //увеливаем уровень
        $this->db->upgradeLevelMonstersByUser($user->id, $monsterId);
    
        $level = $levelMonster + 1;
        $param = $this->db->getParametersMonsterByLevel($level);
        $hp_param = isset($param['hp']->hp) ? intval($param['hp']->hp) : 0;
        //не знаю к чему прибавлять атаку из какой табл брать данные 
        $attack_param= isset($param['attack']->attack) ? intval($param['attack']->attack) : 0;

        //увеличиваем hp 
        $this->db->upgradeHpMonstersByUser($user->id, $monsterId, $hp_param);
        $hp = $this->db->getMonsterHpById($monsterId);
        //$hp = isset($hp->hp) ? intval($hp->hp) : 0;
        $parametersMonsterType = $this->db->getMonsterTypeById($monster_type_id);
        $attack = isset($parametersMonsterType->attack) ? intval($parametersMonsterType->attack) : 0;
        $attack = $attack + $attack_param;


        return[
            $this->db->getMonsterLevelById($monsterId),
            $hp
        ];
    }

}