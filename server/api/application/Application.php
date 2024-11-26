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

    public function getResources($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->user->getResources($params['token']);
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

        if (!isset($params['x'], $params['y'])) {
            return ['error' => 2001];
        }

        if (!filter_var($params['x'], FILTER_VALIDATE_INT) || !filter_var($params['y'], FILTER_VALIDATE_INT)) {
            return ['error' => 2002];
        }

        $x = (int)$params['x'];
        $y = (int)$params['y'];
        $mapData = json_decode($this->map->getMap(), true);
        $borders = [
            'width' => $mapData['data']['map']['width'],
            'height' => $mapData['data']['map']['height']
        ];

        if (!$mapData || !isset($mapData['data']['map']['width'], $mapData['data']['map']['height'])) {
            return ['error' => 850];
        }

        if ($x < 0 || $x > $borders['width'] || $y < 0 || $y > $borders['height']) {
            return ['error' => 2003];
        }

        if ($x == $user->x && $y == $user->y) {
            return ['error' => 2004];
        } 

        /*if ($user->status != 'scout'){
            return ['error' => 2005];
        }*/

        return $this->map->moveUser($user->id, $x, $y);
    }
    

}
