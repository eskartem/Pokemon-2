<?php

class Inventory {
    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function getInventory($userId) {
        return $this->db->getInventory($userId);
    }

    public function addToTeam($monsterId, $inventory, $userId){
        foreach ($inventory['monsters'] as $monster){
            if ($monster['id'] == $monsterId){               
                if ($monster['status'] == 'in team'){
                    return $this->db->changeMonsterStatus($monsterId, 'in pocket');
                }
                
                if ($monster['status'] == 'on sale'){
                    return ['error' => 1450];
                }
                return $this->db->changeMonsterStatus($monsterId, 'in team');
            }
        }
        return ['error' => 1460];
    }
}

