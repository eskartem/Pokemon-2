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
            return $this->user->userInfo($params['token']);
        }
        return ['error' => 404];
    }
    
    //немного недоделано
    public function upgradePokemon($params) {
        if ($params['token'] && $params['monsterId']) {
            return $this->user->upgradePokemon($params['token'], $params['monsterId']);
        }
        return ['error' => 404];
    }


    public function getCatalog($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->market->getCatalog($this->map->isUserInTown($user));
            }
            return ['error' => 705];
        }
        return ['error' => 242];
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

    public function endGame($params){
        if($params['token']){
            return $this->map->endGame($params['token']);
        }
        return ['error' => 242];
    }

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

    public function sell($params){
        if (!isset($params['token']) || !isset($params['type']) || !isset($params['inventoryId'])) {
            return ['error' => 242];
        }
        //пересмотреть инвентори айди, параметр тот же, поменять их поиск
        $user = $this->user->getUser($params['token']);
        if (!$user) {
            return ['error' => 705];
        }

        if (!in_array($params['type'], ['lot', 'merchant', 'exchanger'], true)) {
            return ['error' => 3001];
        }

        $lotExtra = $params['lotExtra'] ?? null;
        if (!in_array($lotExtra, ['pokemon', 'item', null], true)) {
            return ['error' => 3002];
        }

        $inventory = $this->inventory->getInventory($params['inventoryId']);
        if (!$inventory){
            return ['error' => 3007];
        }

        $objectId = $params['objectId'] ?? null;
        if (!is_null($objectId) && !filter_var($objectId, FILTER_VALIDATE_INT)) {
            return ['error' => 3002];
        }

        $resourceAmount = $params['amount'] ?? null;
        if (!is_null($objectId) && !filter_var($objectId, FILTER_VALIDATE_INT)) {
            return ['error' => 3002];
        }

        //как будто lotExtra тоже не нужен
        return $this->market->sell($user->id, $params['type'], $inventory, $lotExtra, $objectId, $resourceAmount);
    }
}
