<?php   

class Inventory{
    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function getInventory($inventoryId){
        return $this->db->getInventoryByItsId($inventoryId);
    }
}
