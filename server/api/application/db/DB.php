<?php

class DB {
    private $pdo;
    private $user;
    private $catalog;

    private $map;

    function __construct() {
        // MySQL
        /*
        $host = '127.0.0.1';
        $port = '3306';
        $user = 'root';
        $pass = '---';
        $db = 'nopainnogame';
        $connect = "mysql:host=$host;port=$port;dbname=$db;charset=utf8";
        $this->pdo = new PDO($connect, $user, $pass);
        */

        // Postgres
        
        // $host = 'localhost';
        // $port = '5432';
        // $user = 'postgres';
        // $pass = '---';
        // $db = 'nopainnogame';
        // $connect = "pgsql:host=$host;port=$port;dbname=$db;";
        // $this->pdo = new PDO($connect, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

        //не могу разобраться, как подключить в новых версиях ospanel дазы банных, поэтому жестко юзаем статику
        // если что, то очевидно, что регисрация и логаут не будут работать по очевидным причинам


        
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


        $this->user = new stdClass();
        $this->user->id = 1;
        $this->user->login = 'admin';
        $this->user->password = md5('admin'.'111');
        $this->user->name = 'admin';
        $this->user->creatures = [$p1, $p2, $p3];
        $this->user->team = [$p1, $p2, $p3];
        $this->user->coins = 100;
        $this->user->crystals = 15;
        $this->user->eggFragments = 3;

        $mapUser = new stdClass();
        
        $mapUser->id = 1;
        $mapUser->user_id = $this->user->id;
        $mapUser->position = [0, 0];
        $mapUser->isPvp = false;
        $mapUser->isSafe = true;

        $this->map = [
            "$mapUser->user_id" => $mapUser,
        ];

        $this->catalog = [
            'creatures' => [$p1, $p2, $p3],
            'resources' => [$res1, $res2, $res3],
        ];
    }

    public function __destruct() {
        // $this->pdo = null;
    }

    // выполнить запрос без возвращения данных
    private function execute($sql, $params = []) {
        // $sth = $this->pdo->prepare($sql);
        // return $sth->execute($params);
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
        // return $this->query("SELECT * FROM users WHERE login=?", [$login]);
        return $this->user;
    }

    public function getUserByToken($token) {
        // return $this->query("SELECT * FROM users WHERE token=?", [$token]);
        return $this->user;
    }

    public function updateToken($userId, $token) {
        // $this->execute("UPDATE users SET token=? WHERE id=?", [$token, $userId]);
    }

    public function registration($login, $hash, $name) {
        // $this->execute("INSERT INTO users (login,password,name) VALUES (?, ?, ?)",[$login, $hash, $name]);
    }

    public function getChatHash() {
        // return $this->query("SELECT * FROM hashes WHERE id=1");
    }

    public function updateChatHash($hash) {
        // $this->execute("UPDATE hashes SET chat_hash=? WHERE id=1", [$hash]);
    }

    public function addMessage($userId, $message) {
        // $this->execute('INSERT INTO messages (user_id, message, created) VALUES (?,?, now())', [$userId, $message]);
    }

    public function getMessages() {
        // return $this->queryAll("SELECT u.name AS author, m.message AS message,
        //                         to_char(m.created, 'yyyy-mm-dd hh24:mi:ss') AS created FROM messages as m 
        //                         LEFT JOIN users as u on u.id = m.user_id 
        //                         ORDER BY m.created DESC"
        // );
    }

    public function getCatalog() {
        return $this->catalog;
    }

    public function isUserInSafe($user) {
        // нужно сделать запрос в таблицу map, найти там пользователя по id и найти его position,
        //сравнить их с позициями безопасных зон и вывести результат
        $user_id = $user->id;
        return $this->map[$user_id]->isSafe;
    }

    public function startGame($user) {
        // добавить пользователя в таблицу map и получить его позицию
        $user_id = $user->id;
        return $this->map[$user_id]->position;
    }

}