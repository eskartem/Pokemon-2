<?php
require_once ('db/DB.php');
require_once ('user/User.php');
require_once ('chat/Chat.php');
require_once ('market/Market.php');
require_once ('map/Map.php');
require_once ('battle/Battle.php');
require_once ('inventory/Inventory.php');

class Application {
    private $user;
    private $chat;
    private $market;
    private $map;
    private $battle;
    private $inventory;
    
    function __construct() {
        $db = new DB();
        $this->user = new User($db);
        $this->chat = new Chat($db);
        $this->market = new Market($db);
        $this->map = new Map($db);
        $this->battle = new Battle($db);
        $this->inventory = new Inventory($db);
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

    public function makeBet($params) {
        if (!$params['token'] || !$params['lotId'] || !$params['bet']){
            return ['error' => 242]; 
        }

        $newBet = $params['bet'];
        $user = $this->user->getUser($params['token']);
        if (!$user) {
            return ['error' => 705];
        }

        $lots = $this->market->getAllLots($params['token']); //объект
        foreach ($lots as $lot){
            if ($lot['id'] == $params['lotId']){
                return $this->market->makeBet($user->id, $user->money, $lot, $newBet);
            }
        }
        return ['error' => 3016];
    }

    public function makeLot($params){
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

        if ($params['type'] !== 'monster' && $params['type'] !== 'item'){
            return ['error' => 3001];
        }

        if (!filter_var($params['startCost'], FILTER_VALIDATE_INT) || $params['startCost'] <= 0 ||
            !filter_var($params['stepCost'], FILTER_VALIDATE_INT) || $params['stepCost'] <= 0){
            return ['error' => 3003];
        }
        
        $inventory = $this->inventory->getInventory($user->id);
        if (!$inventory){
            return ['error' => 3007];
        }

        if ($params['type'] === 'monster'){
            foreach ($inventory['monsters'] as $monsters){
                if ($monsters['id'] == $params['id']){
                    if (count($inventory['monsters']) > 3){
                        return $this->market->makeLotMonster($user, $params['id'], $params['startCost'], $params['stepCost']);
                    }
                    return ['error' => 3004];
                }
            }
            return ['error' => 3008];
        }

        if ($params['type'] === 'item'){
            if (!$params['amount']){
                return ['error' => 242];
            }

            if (!filter_var($params['amount'], FILTER_VALIDATE_INT) || $params['amount'] <= 0){
                return ['error' => 3002];
            }

            foreach ($inventory['inventory'] as $items){
                if ($items['resource_id'] == $params['id']){
                    if ($items['resource_amount'] >= $params['amount']){
                        return $this->market->makeLotItem($user, $params['id'], $params['startCost'], $params['stepCost'], $params['amount']);
                    }
                    return ['error' => 3009];
                }
            }
            return ['error' => 3008];
        }
    }

    public function getInventory($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->inventory->getInventory($user->id);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function getCatalog($params) {
        if (!$params['token']) {
            return ['error' => 242];
        }

        $user = $this->user->getUser($params['token']);
        if (!$user) {
            return ['error' => 705];
        }

        return $this->market->getCatalog($this->map->isUserInZone($user, "город"));
    }
  
    public function sell($params){
        if (!isset($params['token'], $params['type'], $params['amount'])){
            return ['error' => 242];
        }

        $user = $this->user->getUser($params['token']);
        if (!$user){
            return ['error' => 705];
        }

        $inventory = $this->inventory->getInventory($user->id);
        if (!$inventory){
            return ['error' => 3007];
        }

        if (!filter_var($params['amount'], FILTER_VALIDATE_INT) || $params['amount'] <= 0) {
            return ['error' => 3002];
        }

        if ($params['type'] === 'merchant') {
            if (!isset($params['objectId']) || !filter_var($params['objectId'], FILTER_VALIDATE_INT)) {
                return ['error' => 3002];
            }
    
            return $this->market->sell($user->id, $inventory, $params['objectId'], $params['amount']);
        }

        if ($params['type'] === 'exchanger'){
            return $this->market->exchange($user->id, $inventory, $params['amount']);
        }

        return ['error' => 3001];
    }
}

