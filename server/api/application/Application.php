<?php
require_once ('db/DB.php');
require_once ('user/User.php');
require_once ('chat/Chat.php');
require_once ('market/Market.php');
require_once ('map/Map.php');
require_once ('battle/Battle.php');

class Application {
    private $user;
    private $chat;
    private $market;
    private $map;
    private $battle;
    
    function __construct() {
        $db = new DB();
        $this->user = new User($db);
        $this->chat = new Chat($db);
        $this->market = new Market($db);
        $this->map = new Map($db);
        $this->battle = new Battle($db);
    }

    public function login($params) {
        if ($params['login'] && $params['hash'] && $params['rnd']) {
            return $this->user->login($params['login'], $params['hash'], $params['rnd']);
        }
        return ['error' => 242];
    }

    public function logout($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->user->logout($params['token']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function registration($params) {
        if ($params['login'] && $params['hash'] && $params['name']) {
            return $this->user->registration($params['login'], $params['hash'], $params['name']);
        }
        return ['error' => 242];
    }

    public function sendMessage($params) {
        if ($params['token'] && $params['message']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->chat->sendMessage($user->id, $params['message']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function getMessages($params) {
        if ($params['token'] && $params['hash']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->chat->getMessages($params['hash']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function userInfo($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->user->userInfo($params['token']);
            }
            return ['error' => 705];
        }
        return ['error' => 404];
    }
    
    public function upgradePokemon($params) {
        if ($params['token'] && $params['monsterId']) {
            $user = $this->user->getUser($params['token']);
            $monsters = $this->user->getMonster($params['monsterId']);
            if ($user) {
                if ($monsters->user_id === $user->id) {
                    return $this->user->upgradePokemon($params['token'], $params['monsterId']);
                }
              
                return ['error' => 702];
            }
            return ['error' => 705];

        }
        return ['error' => 404];
    }


    public function getAllLots($params) {
        if (!$params['token']) {
            return ['error' => 242];
        }

        $user = $this->user->getUser($params['token']);
        if (!$user) {
            return ['error' => 705];
        }

        return $this->market->getAllLots($this->map->isUserInZone($user, "город"));
    }

    public function getResources($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->user->getResources($params['token']);
            }
            return ['error' => 705];
        }
    }

    public function startGame($params){
        if($params['token']){
            return $this->map->startGame($params['token']);
        }
        return ['error' => 242];
    }


    public function getMap($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->map->getMap();
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    /*public function startGame($params){
        if($params['token']){
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->map->startGame($params['token']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function endGame($params){
        if($params['token']){
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->map->endGame($params['token']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }*/

    public function moveUser($params) {
        if (!isset($params['token'])) {
            return ['error' => 242];
        }
        $user = $this->user->getUser($params['token']);
        if (!$user) {
            return ['error' => 705];
        }
        if (!isset($params['direction'])) {
            return ['error' => 2001];
        }
        $direction = $params['direction'];
        return $this->map->moveUser($user->id, $direction, $user->x, $user->y);
    }

    public function updateScene($params) {
        if ($params['token'] && $params['hash']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->map->updateScene($params['hash']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function makeLot($params){
        // некоторые ошибки на другой ветке, я потом  их сюда подсосу
        if (!isset($params['token'], $params['type'], $params['startCost'], $params['stepCost'], $params['id'])){
            return ['error' => 242];
        }

        $user = $this->user->getUser($params['token']);
        if (!$user) {
            return ['error' => 705];
        }

        $inTown = $this->map->isUserInZone($user, "город");
        if (!$inTown){
            return ['error' => 2999];
        }

        if ($params['type'] !== 'pokemon' && $params['type'] !== 'item'){
            return ['error' => 's'];
        }

        if ($params['startCost'] <= 0 || $params['stepCost'] <= 0){
            return ['error' => 's'];
        }

        $zalog = (int)$params['startCost'] / 100 * 5; // 5%
        if ($user->money < $zalog){
            return ['error' => 's'];
        }

        if ($params['type'] === 'pokemon'){
            $pokemon = $this->db->getMonsterById($params['id']);
            if (!$pokemon){
                return ['error' => 's'];
            }
        }


    }


}
