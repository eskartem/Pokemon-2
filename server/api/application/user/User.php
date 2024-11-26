<?php

class User {
    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function getUser($token) {
        return $this->db->getUserByToken($token);
    }

    public function login($login, $hash, $rnd) {
        $user = $this->db->getUserByLogin($login);
        if ($user) {
            if (md5($user->password . $rnd) === $hash) {
                $token = md5(rand());
                $this->db->updateToken($user->id, $token);
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'token' => $token,
                    'coins' => $user->coins,
                    'crystals' => $user->crystals,
                    'eggFragments' => $user->egg_fragments,
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
            return [
                'id' => $user->id,
                'name' => $user->name,
                'token' => $token,
                'coins' => $user->coins,
                'crystals' => $user->crystals,
                'eggFragments' => $user->egg_fragments,
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
            $this->db-> getMonstersByUser($user),
            $this->db-> getInventoryByUser($user)
        ];
    }
    return ['error' => 404]; 
}


public function upgradePokemon($token, $monsterId) {
    // Получаем пользователя по токену
    $user = $this->db->getUserByToken($token);
    if (!$user) {
        return ['error' => 404];
    }
    //наверно надо написать проверку id покемона

    //узнаем уровень покемона
    $levelMonster = $this->db->getMonsterLevelById($monsterId);

    //Получаем id стихии, которая принадлежит покемону
    $element_id_By_Monster = $this->db->getElementByMonsters($monsterId);

    //узнаем скок кристалов у пользака определенной стихии 
    $resources = $this->db->getAmountResourcesByUser($user, $element_id_By_Monster);
    $crystalAmount = !empty($resources['crystal']) ? $resources['crystal'] : 0;
    
    $resourceType = 'crystal';
    
    if ($levelMonster === 1){
        if ($crystalAmount < 10){
            return ['message' => 'Не хватает средств'];
        }else{
            $amount = 10; 
            $level = 2;
        }
    }
    if ($levelMonster === 2){
        if ($crystalAmount < 20){
            return ['message' => 'Не хватает средств'];
        }else{
            $amount = 20;
            $level = 3;
        }
    }
    if ($levelMonster === 3){
        if ($crystalAmount < 100){
            return ['message' => 'Не хватает средств'];
        }else{
            $amount = 100;
            $level = 4;
        }
    }
    if ($levelMonster === 4){
        if ($crystalAmount < 500){
            return ['message' => 'Не хватает средств'];
        }else{
            $amount = 500;
            $level = 5;
        }
    }
    if ($levelMonster === 5){
        return ['message' => 'Покемон максимально уровня'];
    }

    //вычитаем ресурсы
    $this->db->clearUserResource($user, $resourceType, $amount, $element_id_By_Monster );
    //увеливаем уровень
    $this->db->upgradeLevelMonstersByUser($user, $monsterId);
    
    $param = $this->db->getParametersMonsterByLevel($level);
    $hp_param = !empty($param['hp']) ? $param['hp'] : 0;
    $attack_param = !empty($param['attack']) ? $param['attack'] : 0;

    //Я не знаю, к какой таблице нужно добавлять обновленные параметры, пока так
    $hp = 0;
    $attack = 0;

    return[
        $level,
        $hp,
        $attack
    ];
}

}