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
            $monsters = $this->inventory->getMonster($params['monsterId']);
            if ($user) {
                if ($monsters->user_id === $user->id) {
                    return $this->inventory->upgradePokemon($params['token'], $params['monsterId']);
                }
              
                return ['error' => 702];
            }
            return ['error' => 705];

        }
        return ['error' => 404];
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
        if (!in_array($direction, ['up', 'down', 'left', 'right'])) {
            return ['error' => 2002];
        }

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
                        if ($monster['status'] == 'in team') {
                            foreach ($inventory['monsters'] as $newMonster) {
                                if ($newMonster['status'] == 'in pocket') {
                                    $this->db->changeMonsterStatus($newMonster['id'], 'in team');
                                    break;
                                }
                            }
                        }
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

        $inTown = $this->map->isUserInZone($user, "город");
        if (!$inTown){
            return ['error' => 2999];
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

    //Боевка

    public function startBattle($params) {
        if (!$params['token']) {
            return ['error' => 242];
        }
    
        $user = $this->user->getUser($params['token']);
        if (!$user) {
            return ['error' => 705];
        }
    
        if ($user->status == 'fight') {
            return ['error' => 4003];
        }
    
        $zones = ['перекати-поле', 'куст', 'корабль', 'пещера', 'город'];
        $zoneChecks = [];
        
        foreach ($zones as $zone) {
            $zoneChecks[$zone] = $this->map->isUserInZone($user, $zone);
        }
    
        return $this->battle->startBattle($user, $zoneChecks);
    }
    
    public function updateBattle($params) {
        if ($params['token'] && $params['hash']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->battle->updateBattle($params['hash']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }
    
    public function endBattle($params) {
        if ($params['fightId']) {
            $fight = $this->battle->getFight($params['fightId']);
            
            if ($fight){
                return $this->battle->endBattle($params['fightId']);
            }
            return['error' => 4003];
        }
        return ['error' => 404];
    }
    

    public function actionUser($params){
        if ($params['monsterId1'] && $params['monsterId2'] && $params['action']){
            $monster1 = $this->inventory->getMonster($params['monsterId1']);
            $monster2 = $this->inventory->getMonster($params['monsterId2']);
            if ($monster1 && $monster2){
                if ($params['action'] === 'skill') {
                    return $this->battle->actionUser($params['monsterId1'], $params['monsterId2'], $params['action']);
                }elseif($params['action'] === 'attack'){
                    return $this->battle->actionUser($params['monsterId1'], $params['monsterId2'], $params['action']);  
                }elseif($params['action'] === 'escape'){
                    return $this->battle->actionUser($params['monsterId1'], $params['monsterId2'], $params['action']);
                }
                return ['error' => 704];
            }
            return ['error' => 702];
        }
        return ['error' => 242];
    }

    public function addToTeam($params) {
        if (!isset($params['token'], $params['monsterId'])){
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

        return $this->inventory->addToTeam($params['monsterId'], $inventory, $user->id);
    }


    public function updateLots($params){
        if ($params['token'] && $params['hash']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                $lots = $this->market->getAllLots($this->map->isUserInZone($user, "город"));
                if (!$lots){
                    return ['error' => 2999];
                }
                return $this->market->updateLots($params['hash'], $lots);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function cancelLot($params){
        if ($params['token'] && $params['lotId']){
            $user = $this->user->getUser($params['token']);
            if ($user) {
                $lots = $this->market->getAllLots($this->map->isUserInZone($user, "город"));
                if (!$lots){
                    return ['error' => 2999];
                }
                return $this->market->cancelLot($params['lotId'], $lots, $user);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function getInfoAboutUpgrade($params){
        if ($params['monsterId']){
            $monster = $this->inventory->getMonster($params['monsterId']);
            if ($monster){
                return $this->inventory->getInfoAboutUpgrade($params['monsterId']);
            }
            return['error' => 702];
        }
        return ['error' => 242];
    }

    public function getInfoMonster($params){
        if ($params['monsterId']){
            $monster = $this->inventory->getMonster($params['monsterId']);
            if ($monster){
                return $this->battle->getInfoMonster($params['monsterId']);
            }
            return['error' => 702];
        }
        return ['error' => 242];
    }

    public function hatchEgg($params){
        if (!isset($params['token'])) {
            return ['error' => 242];
        }
        $user = $this->user->getUser($params['token']);
        if (!$user) {
            return ['error' => 705];
        }
    
        $inTown = $this->map->isUserInZone($user, "город");
        if (!$inTown) {
            return ['error' => 2999];
        }
    
        $inventory = $this->inventory->getInventory($user->id);
        if (!$inventory) {
            return ['error' => 3007];
        }
    
        return $this->inventory->hatchEgg($inventory);
    }

    
    public function getQueue($params){
        if ($params['fightId'] && $params['queue']){
            $fight = $this->battle->getFight($params['fightId']);
            if ($fight){
                return $this->battle->getQueue($params['fightId'], $params['queue']);
            }
            return['error' => 4003];
        }
        return ['error' => 242];
    }

}
