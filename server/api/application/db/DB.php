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

    public function updateMarketHash($hash) {
        $this->execute("UPDATE hashes SET market_hash=? WHERE id=1", [$hash]);
    }
    
    public function updateBattleHash($hash) {
        $this->execute("UPDATE hashes SET battle_hash=? WHERE id=1", [$hash]);
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

    //user
    public function addInventoryByUser($userId){//добавление инвентаря при регистрации
        $this->execute('INSERT INTO inventory (user_id, resource_id, resource_amount) VALUES (?,1, 0)', [$userId]);
        $this->execute('INSERT INTO inventory (user_id, resource_id, resource_amount) VALUES (?,2, 0)', [$userId]);
        $this->execute('INSERT INTO inventory (user_id, resource_id, resource_amount) VALUES (?,3, 0)', [$userId]);
    }

    public function addMonsters($userId, $monster_type_id, $status){
        $hp = $this->query('SELECT hp FROM monster_types WHERE id = ?',[$monster_type_id]);
        $hp = $hp->hp;
        
        $this->execute(
            'INSERT INTO monsters (user_id, monster_type_id, level, hp, status) VALUES (?, ?, 1, ?, ?)', 
            [$userId, $monster_type_id, $hp, $status]
        );
        
        $newMonsterId = $this->query('SELECT LAST_INSERT_ID()')->{'LAST_INSERT_ID()'};
        
        return $this->query(
            'SELECT 
                    m.id,
                    mt.name,
                    el.name AS element,
                    m.level,
                    mt.hp AS base_hp,
                    mt.attack AS base_atk,
                    mt.defense AS base_def,
                    mt.image as asset
                FROM monsters m
                JOIN monster_types mt ON m.monster_type_id = mt.id
                LEFT JOIN monster_level ml ON ml.level <= m.level
                LEFT JOIN elements el ON el.id = mt.element_id
                WHERE m.id = ?
                GROUP BY m.id, mt.name, m.level, element, base_hp, base_atk, base_def, asset
            ', [$newMonsterId]
        );
    }
    // сделал, чтобы статус прилетал извне 
    // возвращает теперь инфу о добавленном монстре
    
    public function updateMoneyByUser($userId, $money){
        $this->execute('UPDATE users SET money = ? WHERE id = ?',[$money, $userId]);
    }

    public function getMoneyByUser($userId){
        return $this-> query('SELECT money FROM users WHERE id = ?',[$userId]);
    }

    public function updateUserLocation($userId, $x, $y) {
        $this->execute("UPDATE users SET x = ?, y = ? WHERE id = ?", [$x, $y, $userId]);
    }
        
    public function updateUserStatus($userId, $status){
        return $this->execute('UPDATE users SET status = ? WHERE id =?', [$status, $userId]);
    }

    //map
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

    //monster
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

    public function getMonsterTypeById($monster_type_id){
        return $this->query('SELECT * FROM monster_types WHERE id = ?',[$monster_type_id]);
    }

    public function getMonsterTypeByMonsters($monsterId){//узнаем тип монстра
        return $this->query('SELECT monster_type_id FROM monsters WHERE id = ?',[$monsterId]);
    }
        //status
    public function updateMonsterStatus($monsterId, $status){
        $this->execute('UPDATE monsters SET status = ? WHERE id =?', [$status, $monsterId]);
    }

        //level
    public function getMonsterLevelById($monsterId){
        return $this->query('SELECT level FROM monsters WHERE id = ?',[$monsterId]);
    }

    public function upgradeLevelMonstersByUser($monsterId){
        $this->execute('UPDATE monsters SET level = level + 1 WHERE id = ?', [ $monsterId]);
    }
        //hp
    public function upgradeHpMonstersByUser($monsterId, $hp){
        $this->execute('UPDATE monsters SET hp = hp + ? WHERE id = ?', [$hp, $monsterId]);
    }

    public function getMonsterHpById($monsterId){
        return $this->query('SELECT hp FROM monsters WHERE id = ?',[$monsterId]);
    }

        
    public function getParametersMonsterByLevel($level) { 
        return $this->query("SELECT attack, hp, defense, cost FROM monster_level WHERE level = ?", [$level]);
    } 
    
    public function getElementByMonsters($monster_type_id){ //стихия покемона по типу 
        return $this->query('SELECT element_id FROM monster_types WHERE id = ?',[$monster_type_id]);
    }
    
    //invetory
    public function getInventoryByUser($userId){
        return $this->queryAll('SELECT * FROM inventory WHERE user_id = ?', [$userId]);
    }
    public function getAmountCrystalByUser($userId){
        return $this-> query('SELECT resource_amount FROM inventory WHERE user_id = ? AND resource_id = 1 ',[$userId]);
    }
    public function getAmountEggsByUser($userId){
        return $this-> query('SELECT resource_amount FROM inventory WHERE user_id = ? AND resource_id = 2 ',[$userId]);   
    }
    public function getAmountEggsFragmentByUser($userId){
        return $this-> query('SELECT resource_amount FROM inventory WHERE user_id = ? AND resource_id = 3 ',[$userId]);   
    }
    
    public function clearUserResource($userId, $resourceTypeId, $amount ){
        $this-> execute('UPDATE inventory SET resource_amount = resource_amount	 - ? 
                        WHERE user_id = ? AND resource_id = ?', [$amount, $userId, $resourceTypeId]);
    }

    //lots

    public function clearUserMoney($userId, $money){
        $this->execute('UPDATE users SET money = ? WHERE id = ?',[$money, $userId]);
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
    
    public function getAllLots() {
        return $this->queryAll('
                                SELECT
                                    l.id AS id,
                                    l.seller_id AS seller_id,
                                    l.datetime AS datetime,
                                    l.start_cost AS start_cost,
                                    l.step_cost AS step_cost,
                                    l.current_cost AS current_cost,
                                    l.buyer_id AS buyer_id,
                                    l.type AS type,
                                    l.selling_id AS selling_id,
                                    l.amount AS amount,
                                    l.status AS status,
                                    seller.name AS seller_name,
                                    buyer.name AS buyer_name,
                                    r.name as resource,
                                    m.level as monster_level,
                                    mt.name as monster_name,
                                    m.hp as current_monster_hp,
                                    (mt.hp + COALESCE(SUM(ml.hp), 0)) AS max_HP,
                                    (mt.attack + COALESCE(SUM(ml.attack), 0)) AS ATK,
                                    (mt.defense + COALESCE(SUM(ml.defense), 0)) AS DEF
                                FROM lots AS l
                                LEFT JOIN users AS seller ON seller.id = l.seller_id
                                LEFT JOIN users AS buyer ON buyer.id = l.buyer_id
                                LEFT JOIN resources AS r ON r.id = l.selling_id AND l.type = "item"
                                LEFT JOIN monsters AS m ON m.id = l.selling_id AND l.type = "monster"
                                LEFT JOIN monster_types AS mt ON m.monster_type_id = mt.id AND l.type = "monster"
                                LEFT JOIN monster_level AS ml ON ml.level <= m.level
                                GROUP BY l.id, m.level, mt.id, m.hp, seller.name, buyer.name, r.name
                                
        ');
    }
    

    //battle
    //?
    public function getPlayersInBattle() {
        // Выполняем запрос
        $result = $this->queryAll('SELECT 
                                    u.id AS user_id,
                                    GROUP_CONCAT(DISTINCT m.id) AS monsters,
                                    CASE 
                                        WHEN u.id = f.user1_id THEN f.user2_id  
                                        WHEN u.id = f.user2_id THEN f.user1_id  
                                        ELSE NULL 
                                    END AS opponent_id,
                                    (
                                        SELECT GROUP_CONCAT(DISTINCT m_opp.id)
                                        FROM users AS u_opp
                                        LEFT JOIN monsters AS m_opp ON u_opp.id = m_opp.user_id AND m_opp.status = "in team"
                                        WHERE (u_opp.id = f.user1_id OR u_opp.id = f.user2_id) AND u_opp.id != u.id
                                    ) AS monster_opp
                                    FROM users AS u
                                    LEFT JOIN monsters AS m ON u.id = m.user_id AND m.status = "in team"
                                    LEFT JOIN fight AS f ON (u.id = f.user1_id OR u.id = f.user2_id) AND f.status = "open"
                                    WHERE u.status = "fight"
                                    GROUP BY u.id, f.user1_id, f.user2_id;'
                                );
    
        // Преобразуем строки с идентификаторами монстров в массивы чисел
        foreach ($result as &$row) {
            if (!empty($row['monsters'])) {
                $row['monsters'] = array_map('intval', explode(',', $row['monsters']));
            } else {
                $row['monsters'] = [];
            }
    
            if (!empty($row['monster_opp'])) {
                $row['monster_opp'] = array_map('intval', explode(',', $row['monster_opp']));
            } else {
                $row['monster_opp'] = [];
            }
        }
    
        return $result;
    }

    public function getPlayersScout() {
        return $this->queryAll('SELECT id, name, x, y, rating FROM users WHERE status = "scout"');
    }
    
    public function addFight($userId1, $userId2){
        $this->execute('INSERT INTO fight (user1_id, user2_id, turn, status, result) VALUES (?,?, 0, "open", 0)', [$userId1, $userId2]);
    }

    public function addResultFight($userId1, $userId2, $result){
        $this->execute('UPDATE fight SET status = "close", turn = 1, result = ? WHERE user1_id = ? AND user2_id = ? AND turn = 0', [$result, $userId1, $userId2]);
    }

    //element
    public function getElement($elementId){//узнаем id стихии
        return $this->query('SELECT name FROM elements WHERE id = ?', [$elementId]);
    }
    
    public function makeBet($userId, $lotId, $newBet) {
        return ['ableToMakeBet' =>  $this->execute('UPDATE lots SET buyer_id = ?, timestamp_cost = UNIX_TIMESTAMP(), current_cost = ? WHERE id = ?', 
                                    [$userId, $newBet, $lotId]),
                'ableToTakeMoney' => $this->execute('UPDATE users SET money=money-? WHERE id=?',
                                    [$newBet, $userId])
                ];
    }

    public function getInventory($userId) {
        return [
            'monsters' => $this->queryAll('
                SELECT 
                    m.id,
                    mt.name,
                    el.name AS element,
                    m.status,
                    m.level,
                    m.hp AS current_hp,
                    (mt.hp + COALESCE(SUM(ml.hp), 0)) AS max_HP,
                    (mt.attack + COALESCE(SUM(ml.attack), 0)) AS ATK,
                    (mt.defense + COALESCE(SUM(ml.defense), 0)) AS DEF,
                    mt.image as asset
                FROM monsters m
                JOIN monster_types mt ON m.monster_type_id = mt.id
                LEFT JOIN monster_level ml ON ml.level <= m.level
                LEFT JOIN elements el ON el.id = mt.element_id
                WHERE m.user_id = ?
                GROUP BY m.id, m.user_id, m.level, m.hp, m.status, mt.element_id, mt.name, mt.hp, mt.attack, mt.defense
            ', [$userId]),
            'inventory' => $this->queryAll('SELECT *, r.image FROM inventory AS i LEFT JOIN resources as r ON i.resource_id = r.id WHERE user_id=?', [$userId]),
            'balance' => $this->query('SELECT money FROM users WHERE id=?', [$userId])->money
        ];
    }
    
    

    public function makeLotMonster($userId, $sellingItemId, $startCost, $stepCost, $zalog){
        return ['ableToWithdrawMonster' => $this->execute('UPDATE monsters SET user_id=?, status="on sale" WHERE id=?', [-1, $sellingItemId]),
                'ableToCreateLot' => $this->execute('INSERT INTO lots 
                                    (seller_id, datetime, start_cost, step_cost, current_cost, buyer_id, type, selling_id, status) 
                                    VALUES (?, now(), ?, ?, ?, NULL, "monster", ?, "open")', 
                                    [$userId, $startCost, $stepCost, $startCost, $sellingItemId]),
                'ableToTakeMoney' => $this->execute('UPDATE users SET money=money-? WHERE id=?', [$zalog, $userId])
        ];
    }

    public function makeLotItem($userId, $sellingItemId, $startCost, $stepCost, $amount, $zalog){
        return ['ableToWithdrawResources' => $this->execute('UPDATE inventory SET resource_amount=resource_amount-? WHERE user_id=? AND resource_id=?', [$amount, $userId, $sellingItemId]),
                'ableToCreateLot' => $this->execute('INSERT INTO lots 
                                    (seller_id, datetime, start_cost, step_cost, current_cost, buyer_id, type, selling_id, amount, status) 
                                    VALUES (?, now(), ?, ?, ?, NULL, "item", ?, ?, "open")', 
                                    [$userId, $startCost, $stepCost, $startCost, $sellingItemId, $amount]),
                'ableToTakeMoney' => $this->execute('UPDATE users SET money=money-? WHERE id=?', [$zalog, $userId])
        ];
    }
  
    public function getCatalog(){
        return $this->queryAll('SELECT * from resources');
    }

    public function changeLotStatus($status, $lotId){
        return $this->execute('UPDATE lots SET status=? WHERE id=?', [$status, $lotId]);
    }

    public function changeMonsterStatus($monsterId, $status){
        return $this->execute('UPDATE monsters SET status=? WHERE id=?', [$status, $monsterId]);
    }

    public function changeMonsterOwner($monsterId, $newOwnerId){
        return $this->execute('UPDATE monsters SET user_id=?, status="in pocket" WHERE id=?', [$newOwnerId, $monsterId]);
    }
    //объединить в один метод?
    
    public function getMonsterTypes(){
        return $this->queryAll('SELECT * from monster_types');
    }

    public function getFight ($fightId){
        return $this->query('SELECT * FROM fight WHERE id=?', [$fightId]);
    }

    public function updateQueue($fightId,$queue1, $queue2, $queue3, $queue4, $queue5, $queue6){
        $this->execute('UPDATE fight SET queue1 = ?, queue2 = ?, queue3 = ?, queue4 = ?, queue5 = ?, queue6 = ? WHERE id = ?', [$queue1, $queue2, $queue3, $queue4, $queue5, $queue6, $fightId]);
    }

    public function getSkillById($skillId) { //id скилла совпадают с id типом монстра
        return $this->query('SELECT * FROM skills WHERE id=?', [$skillId]);
    }
}