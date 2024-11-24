<?php

class Market {

    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function getCatalog($isInTown) {
        if ($isInTown) {
            return $this->db->getCatalog();
        }
        return ['error', 2001];
    }

    public function getTraderCatalog($isInTown) {
        if ($isInTown) {
            return $this->db->getTraderCatalog();
        }
        return ['error', 2001];
    }

}