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
        

        public function pokemonUpgrade($token, $monsterId) {
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
            $crystalAmount = !empty($resources['crystal']) ? 
                    $resources['crystal'][0]['resourse'] : 0;
            
            $resourceType = 'crystal';
            

            if ($levelMonster === 1){
                if ($crystalAmount < 10){
                    return ['message' => 'Не хватает средств'];
                }else{
                    $amount = 10; 
                    $level = 2;
                    //1→2 уровень: 10 кристаллов
                    $this->db->clearUserResource($user, $resourceType, $amount );
                    //увеливаем уровень
                    $this->db->upgradeLevelMonstersByUser($user, $monsterId);
                    //2 уровень - +40 к урону, +90 к здоровью покемона.
                    $this->db->getParametersMonsterByLevel($level);
                    return true;
                }
            }
            if ($levelMonster === 2){
                if ($crystalAmount < 20){
                    return ['message' => 'Не хватает средств'];
                }else{
                    $amount = 20;
                    $level = 3;
                    //2→3 уровень: 20 кристаллов
                    $this->db->clearUserResource($user, $resourceType, $amount );
                    //увеливаем уровень
                    $this->db->upgradeLevelMonstersByUser($user, $monsterId);
                    //3 уровень - +70 к урону,+110 к здоровью покемона.
                    $this->db->getParametersMonsterByLevel($level); 
                    return true;
                }
            }
            if ($levelMonster === 3){
                if ($crystalAmount < 100){
                    return ['message' => 'Не хватает средств'];
                }else{
                    $amount = 100;
                    $level = 4;
                    //3→4 уровень: 100 кристаллов
                    $this->db->clearUserResource($user, $resourceType, $amount );
                    //увеливаем уровень
                    $this->db->upgradeLevelMonstersByUser($user, $monsterId);
                    //4 уровень-  +120 к урону, +150 к здоровью покемона.
                    $this->db->getParametersMonsterByLevel($level); 
                    return true;
                }
            }
            if ($levelMonster === 4){
                if ($crystalAmount < 500){
                    return ['message' => 'Не хватает средств'];
                }else{
                    $amount = 500;
                    $level = 5;
                    //4→5 уровень: 500 кристаллов
                    $this->db->clearUserResource($user, $resourceType, $amount );
                    //увеливаем уровень
                    $this->db->upgradeLevelMonstersByUser($user, $monsterId);
                    //5 уровень +200 к урону, +270 к здоровью покемона.
                    $this->db->getParametersMonsterByLevel($level); 
                    return true;
                }
            }
            if ($levelMonster === 5){
                return ['message' => 'Покемон максимально уровня'];
            }
        }

}