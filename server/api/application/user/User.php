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
            $pokemons = $this->db->getPokemonByIdAndUser($user->id);
            return [
                'id' => $user->id,
                'name' => $user->name,
                'pokemons' => $pokemons
            ];
        }
        return ['error' => 404]; 
    }
    
    public function pokemonUpdate($token, $pokemonId) {
        // Получаем пользователя по токену
        $user = $this->db->getUserByToken($token);
        if (!$user) {
            return ['error' => 404];
        }
    
        // Проверяем, существует ли покемон для данного пользователя
        $pokemon = $this->db->getPokemonByIdAndUser($pokemonId, $user->id);
        if (!$pokemon) {
            return ['error' => 2009]; // Покемон не найден
        }
    
        // Обновляем информацию о покемоне
        $updateSuccess = $this->db->updatePokemon($pokemonId);
        if ($updateSuccess) {
            return [
                'pokemonId' => $pokemonId,
                
            ];
        } else {
            return ['error' => 2008]; 
        }
    }
    
}