<?php

class Map {

    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function isUserInTown($user) {
        return true; // просто заглушка
    }

    public function getMap($token){
        $user = $this->db->getUserByToken($token);
        if ($user) {
            return $map = $this->db->getMap($token);
            //хз, имеет ли вообще смысл писать этот кал, просто хочется чтобы к бд обращались только внутри класса DB
        }
        return ['error' => 9000]
    }
}