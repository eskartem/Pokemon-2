<?php

class Map {

    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function startGame($user) {
        $this-> db->startGame($user);
    }

    public function isUserInSafe($user) {
        $this-> db->isUserInSafe($user);
    }

}