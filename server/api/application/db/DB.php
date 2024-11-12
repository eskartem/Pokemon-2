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

        $p1 = new stdClass();
        $p1->id = 1;
        $p1->name = "Duck";
        $p1->element = 'fire';
        $p1->rarity = 'common';
        $p1->lvl = 3;
        $p1->stats = [
            'hp' => 10,
            'ad'=> 15,
            'df'=> 16,
        ];
        $p1->cost = 25;

        $p2 = new stdClass(); 
        $p2->id = 2;
        $p2->name = "Kock";
        $p2->element = 'water';
        $p2->rarity = 'legendary';
        $p2->cost = 310;
        $p2->lvl = 5;
        $p2->stats = [
            'hp' => 20,
            'ad'=> 10,
            'df'=> 15,
        ];

        $p3 = new stdClass(); 
        $p3->id = 3;
        $p3->name = "Pock";
        $p3->element = 'air';
        $p3->rarity = 'rare';
        $p3->cost = 304;
        $p3->lvl = 10;
        $p3->stats = [
            'hp' => 14,
            'ad'=> 19,
            'df'=> 10,
        ];

        $res1 = new stdClass();
        $res1->id = 10;
        $res1->name = "кристаллы улучшения";
        $res1->number = 5;
        $res1->cost = 10;
        
        $res2 = new stdClass();
        $res2->id = 11;
        $res2->name = "кусок яйца";
        $res2->number = 2;
        $res2->cost = 50;

        $res3 = new stdClass();
        $res3->id = 10;
        $res3->name = "Кусок яйца";
        $res3->number = 5;
        $res3->cost = 350;


        $this->catalog = [
            'creatures' => [$p1, $p2, $p3],
            'resources' => [$res1, $res2, $res3],
        ];

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

    public function getMap($token){
        return ['map' => $this->execute("SELECT * FROM map WHERE id=1", [$token]), 
                'zones' => $this->execute("SELECT * FROM zones WHERE id=1", [$token]), 
                'zones_types' => $this->execute("SELECT * FROM zones_types WHERE id=1", [$token])
        ];
        //мб токен вообще не используется и удалить его нах
    }
        


    public function updateUserLocation($userId, $position) {
        //return $this->execute("UPDATE map SET position=? WHERE id=?", [$position, $userId]);
    }
    //примерно
    public function clearUserResource($user){
        //return $this-> execute('DELETE FROM resource WHERE user_id = ?', [$user->id]);
    }
    

}