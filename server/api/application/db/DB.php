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
        // $db = 'cockstaris';
        // $connect = "pgsql:host=$host;port=$port;dbname=$db;";
        // $this->pdo = new PDO($connect, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

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

    public function getUsersByStatus($status) {
        return $this->queryAll("SELECT id, login, name, x, y FROM users WHERE status=?", [$status]);
    }

    public function updateToken($userId, $token) {
        $this->execute("UPDATE users SET token=? WHERE id=?", [$token, $userId]);
    }

    public function registration($login, $hash, $name) {
        $this->execute("INSERT INTO users (login,password,name) VALUES (?, ?, ?)",[$login, $hash, $name]);
    }

    public function getHash() {
        return $this->query("SELECT * FROM hashes WHERE id=1");
    }

    public function updateChatHash($hash) {
        $this->execute("UPDATE hashes SET chat_hash=? WHERE id=1", [$hash]);
    }

    public function updateMapHash($hash) {
        $this->execute("UPDATE hashes SET map_hash=? WHERE id=1", [$hash]);
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

    public function getMap(){
        $game = $this->query("SELECT map_id FROM game");
        $mapId = $game->map_id;
        return ['map' => $this->query("SELECT * FROM map WHERE id = ?", [$mapId]),
                'map_zones' => $this->queryAll("SELECT 
                name, x, y, width, height, type, element_id 
                FROM map_zones WHERE map_id = ?", [$mapId])
        ];
    }
        
    public function moveUser($userId, $newX, $newY) {
        return $this->execute("UPDATE users 
            SET x=?, y=? 
            WHERE id=?", [$newX, $newY, $userId]
        );
    }

    public function getMonstersByUser($userId, $status = null) {
        if ($status === null) {
            return $this->queryAll('SELECT * FROM monsters WHERE user_id = ?', [$userId]);
        } else {
            return $this->queryAll('SELECT * FROM monsters WHERE user_id = ? AND status = ?', [$userId, $status]);
        }
    }

    public function getMonsterById($monsterId){
        return $this->query('SELECT * FROM monsters WHERE id = ?',[$monsterId]);
    }
    
    public function getInventoryByUser($userId){
        return $this->queryAll('SELECT * FROM inventory WHERE user_id = ?', [$userId]);
    }
    
    public function getMonsterLevelById($monsterId){
        return $this->query('SELECT level FROM monsters WHERE id = ?',[$monsterId]);
    }
    
    public function getMonsterTypeById($monster_type_id){
        return $this->query('SELECT * FROM monster_types WHERE id = ?',[$monster_type_id]);
    }
    
    public function upgradeLevelMonstersByUser($userId, $monsterId){
        $this->execute('UPDATE monsters SET level = level + 1 WHERE user_id = ? AND id = ?', [$userId, $monsterId]);
    }

    public function upgradeHpMonstersByUser($userId, $monsterId, $hp){
        $this->execute('UPDATE monsters SET hp = hp + ? WHERE user_id = ? AND id = ?', [$hp, $userId, $monsterId]);
    }

    public function getMonsterHpById($monsterId){
        return $this->query('SELECT hp FROM monsters WHERE id = ?',[$monsterId]);
    }


    //параметры покемона, которые прибавлются при улучшении
    public function getParametersMonsterByLevel($level) {
        return [ 
            'attack' => $this->query("SELECT attack FROM monster_level WHERE level = ?", [$level]),
            'hp' => $this->query("SELECT hp FROM monster_level WHERE level = ?", [$level])
        ];
    } 
    
    public function getMonsterTypeByMonsters($monsterId){
        return $this->query('SELECT monster_type_id FROM monsters WHERE id = ?',[$monsterId]);
    }

    public function getElementByMonsters($monster_type_id){
        return $this->query('SELECT element_id FROM monster_types WHERE id = ?',[$monster_type_id]);
    }

    //узнаем id стихии
    public function getIdByElement($element){
        return $this->query('SELECT id FROM elements WHERE name = ?', [$element]);
    }
    
    public function getAmountCrystalByUser($userId){
        return $this-> query('SELECT resource_amount FROM inventory WHERE user_id = ? AND resource_id = 1 ',[$userId]);
        
    }
    
    public function getMoneyByUser($userId){
        return $this-> query('SELECT money FROM users WHERE id = ?',[$userId]);
    }

    public function clearUserMoney($userId, $money){
        $this->execute('UPDATE users SET money = ? WHERE id = ?',[$money, $userId]);
    }
   
    public function clearUserResource($userId, $resourceTypeId, $amount ){
        $this-> execute('UPDATE inventory SET resource_amount = resource_amount	 - ? 
                        WHERE user_id = ? AND resource_id = ?', [$amount, $userId, $resourceTypeId]);
    }
    
    public function updateUserStatus($userId, $status){
        $this->execute('UPDATE users SET status = ? WHERE id =?', [$status, $userId]);
    }

    public function getPlayersIngame() {
        return $this->queryAll('SELECT id, name, status, x, y FROM users');
    }

    public function getResources(){
        return $this->queryAll('SELECT * FROM resources');
    }

    public function getResourcesById($objectId){
        return $this->query('SELECT * FROM resources WHERE id=?', [$objectId]);
    }

    public function sellResources($sellingResourceId, $resourceAmount, $userId){
        return $this->execute('UPDATE inventory SET resource_amount=resource_amount-? WHERE resource_id=? AND user_id=?', [$resourceAmount, $sellingResourceId, $userId]);
    }

    public function changeMoney($userId, $balanceIncrease){
        return $this->execute('UPDATE users SET money=money+? WHERE id=?', [$balanceIncrease, $userId]);
    }
    
    public function getAllLots(){
        return $this->queryAll('SELECT * from lots');
    }

    public function getInventory($userId){
        return ['monsters' => $this->queryAll('SELECT * FROM monsters WHERE user_id=?', [$userId]),
                'monsterTypes' => $this->queryAll('SELECT * FROM monster_types'),
                'inventory' => $this->queryAll('SELECT * FROM inventory WHERE user_id=?', [$userId]),
                'balance' => $this->query('SELECT money FROM users WHERE id=?', [$userId])
        ];
    }

    public function getCatalog(){
        return $this->queryAll('SELECT * from resources');

    }
}