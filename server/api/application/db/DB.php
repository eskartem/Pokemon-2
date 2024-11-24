<?php

class DB {
    private $pdo;
    private $catalog;

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
        $this->execute("INSERT INTO users (login,password,name, team_id, inventory_id) VALUES (?, ?, ?, ?, ?)",[$login, $hash, $name, '1', '1']);
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


    public function getResources($token) {
        // как нить получить ресы пользователя по токену и вернуть, только на sql, а пока статика-_-
        return $this->user->resources;
    }

    public function getMap(){
        return ['map' => $this->execute("SELECT * FROM map WHERE id=1"), 
                'map_zones' => $this->execute("SELECT * FROM map_zones WHERE id=1")
        ];
    }
        
    public function updateUserLocation($userId, $position) {
        //return $this->execute("UPDATE map SET position=? WHERE id=?", [$position, $userId]);



        /* 
        в map нет записей с position, но они есть в user как x и y
        не изменяю $position в самом методе, чтобы ничего не поломалось
        */
        //return $this->execute("UPDATE users SET x=?, y=? WHERE id=?", [$position[0], $position[1], $userId]);
    }

    //примерно
    public function clearUserResource($user){
        //return $this-> execute('DELETE FROM resource WHERE user_id = ?', [$user->id]);
    }
    

}