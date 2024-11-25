<?php

class DB {
    private $pdo;
    private $catalog;
    private $TraderCatalog;

    function __construct() {

        // MySQL

        $host = '127.0.0.1';
        $port = '3306';
        $user = 'root';
        $pass = '';
        $db = 'monstaris';
        $connect = "mysql:host=$host;port=$port;dbname=$db;charset=utf8";
        $this->pdo = new PDO($connect, $user, $pass);
        

        // Postgres
        
        // $host = 'localhost';
        // $port = '5432';
        // $user = 'postgres';
        // $pass = '---';
        // $db = 'nopainnogame';
        // $connect = "pgsql:host=$host;port=$port;dbname=$db;";
        // $this->pdo = new PDO($connect, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

        $this->catalog = [
            'creatures' => [
                $this->createCreature(1, "Duck", 'fire', 'common', 3, 25, [
                    'hp' => 10,
                    'ad' => 15,
                    'df' => 16,
                ]),
                $this->createCreature(2, "Kock", 'water', 'legendary', 5, 310, [
                    'hp' => 20,
                    'ad' => 10,
                    'df' => 15,
                ]),
                $this->createCreature(3, "Pock", 'air', 'rare', 10, 304, [
                    'hp' => 14,
                    'ad' => 19,
                    'df' => 10,
                ]),
            ],
            'resources' => [
                $this->createResource(10, "кристаллы улучшения", 5, 10),
                $this->createResource(11, "кусок яйца", 2, 50),
                $this->createResource(12, "Кусок яйца", 5, 350), 
            ],
        ];
    }

    private function createCreature($id, $name, $element, $rarity, $lvl, $cost, $stats) {
        $creature = new stdClass();
        $creature->id = $id;
        $creature->name = $name;
        $creature->element = $element;
        $creature->rarity = $rarity;
        $creature->lvl = $lvl;
        $creature->cost = $cost;
        $creature->stats = $stats;
        return $creature;
    }

    private function createResource($id, $name, $number, $cost) {
        $resource = new stdClass();
        $resource->id = $id;
        $resource->name = $name;
        $resource->number = $number;
        $resource->cost = $cost;
        return $resource;
    }
    
    // Tradercatalog
        $this->TraderCatalog = [
            'creatures' => [
                $this->createCreature1(1, "Duck", 'fire', 'common', 3, 25, [
                    'hp' => 10,
                    'ad' => 15,
                    'df' => 16,
                ]),
                $this->createCreature1(2, "Kock", 'water', 'legendary', 5, 310, [
                    'hp' => 20,
                    'ad' => 10,
                    'df' => 15,
                ]),
                $this->createCreature1(3, "Pock", 'air', 'rare', 10, 304, [
                    'hp' => 14,
                    'ad' => 19,
                    'df' => 10,
                ]),
            ],
            'resources' => [
                $this->createResource1(10, "кристаллы улучшения", 5, 10),
                $this->createResource1(11, "кусок яйца", 2, 50),
                $this->createResource1(12, "Кусок яйца", 5, 350), 
            ],
        ];
    }

    private function createCreature1($id, $name, $element, $rarity, $lvl, $cost, $stats) {
        $creature = new stdClass();
        $creature->id = $id;
        $creature->name = $name;
        $creature->element = $element;
        $creature->rarity = $rarity;
        $creature->lvl = $lvl;
        $creature->cost = $cost;
        $creature->stats = $stats;
        return $creature;
    }

    private function createResource1($id, $name, $number, $cost) {
        $resource = new stdClass();
        $resource->id = $id;
        $resource->name = $name;
        $resource->number = $number;
        $resource->cost = $cost;
        return $resource;
    }
    //end
    public function __destruct() {
        $this->pdo = null;
    }

    // выполнить запрос без возвращения данных
    private function execute($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        return $sth->execute($params);
    }

    // получение ОДНОЙ записи
    private function query($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($params);
        return $sth->fetch(PDO::FETCH_OBJ);
    }

    // получение НЕСКОЛЬКИХ записей
    private function queryAll($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($params);
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserByLogin($login) {
        return $this->query("SELECT * FROM users WHERE login=?", [$login]);
        // return $this->user;
    }

    public function getUserByToken($token) {
        return $this->query("SELECT * FROM users WHERE token=?", [$token]);
        // return $this->user;
    }

    public function updateToken($userId, $token) {
        $this->execute("UPDATE users SET token=? WHERE id=?", [$token, $userId]);
    }

    public function registration($login, $hash, $name) {
        $this->execute("INSERT INTO users (login,password,name) VALUES (?, ?, ?)",[$login, $hash, $name]);
    }

    public function getChatHash() {
        return $this->query("SELECT * FROM hashes WHERE id=1");
    }

    public function updateChatHash($hash) {
        $this->execute("UPDATE hashes SET chat_hash=? WHERE id=1", [$hash]);
    }

    public function addMessage($userId, $message) {
        $this->execute('INSERT INTO messages (user_id, message, created) VALUES (?,?, now())', [$userId, $message]);
    }

    public function getMessages() {
        return $this->queryAll(
            "SELECT
                    u.name AS author,
                    m.message AS message,
                    m.created AS created
            FROM messages as m
            LEFT JOIN users as u on u.id = m.user_id
            ORDER BY m.created DESC"
        );
    }

    public function getCatalog() {
        return $this->catalog;
    }

    public function getTraderCatalog() {
        return $this->TraderCatalog;
    }

    public function getResources($token) {
        // как нить получить ресы пользователя по токену и вернуть, только на sql, а пока статика-_-
        //return $this->user->resources;
    }

    public function getMap($token){
        return ['map' => $this->execute("SELECT * FROM map WHERE id=1", [$token]), 
                'zones' => $this->execute("SELECT * FROM zones WHERE id=1", [$token]), 
                'zones_types' => $this->execute("SELECT * FROM zones_types WHERE id=1", [$token])
        ];
        //мб токен вообще не используется и удалить его нах
    }
        
    public function updateUserLocation($userId, $x, $y) {
        $this->execute("UPDATE users SET x = ?, y = ? WHERE id = ?", [$x, $y, $userId]);
    }

    public function getMontersByUser($userId, $status = null) {
        if ($status === null) {
            return $this->execute('SELECT * FROM monsters WHERE user_id = ?', [$userId]);
        } else {
            return $this->execute('SELECT * FROM monsters WHERE user_id = ? AND status = ?', [$userId, $status]);
        }
    }

    public function getInventoryByUser($userId){
        return $this->execute('SELECT * FROM inventory WHERE user_id = ?', [$userId]);
    }
    
    public function getMonsterLevelById($monsterId){
        return $this->execute('SELECT level FROM monsters WHERE id = ?',[$monsterId]);
    }
    
    public function upgradeLevelMonstersByUser($userId, $monsterId){
        $this->execute('UPDATE monsters SET level = level + 1 WHERE user_id = ? AND id = ?', [$userId, $monsterId]);
    }

    //параметры покемона, которые прибавлются при улучшении
    public function getParametersMonsterByLevel($level) {
        return [ 
            'attack' => $this->query("SELECT attack FROM monster_level WHERE level = ?", [$level]),
            'hp' => $this->query("SELECT hp FROM monster_level WHERE level = ?", [$level])
        ];
    } 
    
    public function getElementByMonsters($monsterId){
        $monsters_type_id = $this->execute('SELECT monster_type_id FROM monsters WHERE id = ?',[$monsterId]);
        return $this->execute('SELECT element_id FROM monsters_types WHERE id = ?',[$monsters_type_id]);
    }

    //узнаем id стихии
    public function getIdByElement($element){
        return $this->execute('SELECT id FROM elements WHERE name = ?', [$element]);
    }
    
    //не уверена я в этом запросе
    public function getAmountResourcesByUser($userId, $element_id = null){
        if($element_id === null){
            return[
                'eggs' => $this-> query('SELECT resource FROM inventory WHERE user_id = ? AND resource_type = "eggs"',[$userId]),
                'crystal' => $this-> query('SELECT resource FROM inventory WHERE user_id = ? AND resource_type = "crystal"',[$userId]),
                'egg_fragments' => $this-> query('SELECT resource FROM inventory WHERE user_id = ? AND resource_type = "egg_fragments"',[$userId])
        ];}else{
            return[
                'eggs' => $this-> query('SELECT resource FROM inventory WHERE user_id = ? AND resource_type = "eggs" AND element_id = ?',[$userId, $element_id]),
                'crystal' => $this-> query('SELECT resource FROM inventory WHERE user_id = ? AND resource_type = "crystal" AND element_id = ?',[$userId, $element_id]),
                'egg_fragments' => $this-> query('SELECT resource FROM inventory WHERE user_id = ? AND resource_type = "egg_fragments" AND element_id = ?',[$userId, $element_id]) 
            ];

        }
    }

    public function getMoneyByUser($userId){
        return $this-> query('SELECT money FROM users WHERE id = ?',[$userId]);
    }

    public function clearUserMoney($userId, $money){
        $this->execute('UPDATE users SET money = ? WHERE id = ?',[$money, $userId]);
    }

    
    public function clearUserResource($userId, $resourceType, $amount, $element_id ){
        $this-> execute('UPDATE inventory SET resource = resource - ? 
                        WHERE user_id = ? AND resource_type = ? AND element_id = ?', [$amount, $userId, $resourceType, $element_id]);
    }
    
    public function updateUserStatus($userId, $status){
        $this->execute('UPDATE users SET status = ? WHERE id =?', [$status, $userId]);
    }

}