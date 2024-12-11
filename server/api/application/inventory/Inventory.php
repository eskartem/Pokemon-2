<?php

class Inventory {
    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function getInventory($userId) {
        return $this->db->getInventory($userId);
    }

    public function updateInventory($hash, $userId) {
        $currentHash = $this->db->getHash();
        if ($hash === $currentHash->inventory_hash) {
            return [
                'hash' => $hash
            ];
        }
        $inventoryData = $this->db->getInventory($userId);
        return [
            'inventory' => $inventoryData,
            'hash' => $currentHash->inventory_hash
        ];
    }
}