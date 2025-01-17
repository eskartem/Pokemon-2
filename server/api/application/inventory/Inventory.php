<?php

class Inventory {
    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function getInventory($userId) {
        return $this->db->getInventory($userId);
    }

    
    public function getMonster($monsterId){
        return $this->db->getMonsterById($monsterId);    
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
    
    public function upgradePokemon($token, $monsterId) {
        $user = $this->db->getUserByToken($token);
        
        //узнаем уровень покемона
        $levelMonster = $this->db->getMonsterLevelById($monsterId);
        $levelMonster = isset($levelMonster->level) ? intval($levelMonster->level) : 0;
        $level = $levelMonster + 1;

        $param = $this->db->getParametersMonsterByLevel($level);
        //узнаем id типа монстра
        $monster_type_id = $this->db->getMonsterTypeByMonsters($monsterId);
        $monster_type_id = isset($monster_type_id->monster_type_id) ? intval($monster_type_id->monster_type_id) : 0;
        
        //узнаем скок кристалов у пользака определенной стихии 
        $resources = $this->db->getAmountCrystalByUser($user->id);    
        $crystalAmount = isset($resources->resource_amount) ? intval($resources->resource_amount) : 0;
        
        if ($levelMonster === 5) {
            return ['error' => 703 ]; 
        } elseif ($crystalAmount >= $param->cost) {
            $amount = $param->cost;
        } else {
            return ['error' => 802 ];
        }

        $resourceTypeId = 1;
        //вычитаем ресурсы
        $this->db->clearUserResource($user->id, $resourceTypeId, $amount);
        //увеливаем уровень
        $this->db->upgradeLevelMonstersByUser($monsterId);        
        $hp_param = $param->hp;
        //увеличиваем hp 
        $this->db->upgradeHpMonstersByUser($monsterId, $hp_param);
        $hp = $this->db->getMonsterHpById($monsterId);
        

        return[
            $this->db->getMonsterLevelById($monsterId),
            'hp' => $hp
        ];
    }

    public function getInfoAboutUpgrade($monsterId){
        $monster = $this->db->getMonsterById($monsterId);
        $monster_type_id = $monster -> monster_type_id;
        $level = $monster->level + 1;
        $cost = $this->db->getParametersMonsterByLevel($level)->cost;
        $monster_type = $this->db->getMonsterTypeById($monster_type_id);
        $name = $monster_type->name;
        $image = $monster_type->image;

        return[
            'name'=>$name,
            'image'=>$image,
            'level'=> $level,
            'cost' => $cost
        ];

    }

    public function hatchEgg($inventory){
        foreach ($inventory['inventory'] as $res){
            if ($res['resource_id'] == 2){
                if ($res['resource_amount'] == 0){
                    return ['error' => 3006];
                }
                $eggs = $res['resource_amount'];
            }
        }
        
        
        $monsterTypes = $this->db->getMonsterTypes();
        $monsterIds = [];
        foreach ($monsterTypes as $monsterType) {
            $monsterIds[] = $monsterType['id'];
        }

        $randomMonster = $monsterIds[array_rand($monsterIds)];
        return ['hatched' => $this->db->addMonsters($res['user_id'], $randomMonster, 'in pocket'),
                'eggConsumed' => $this->db->sellResources(2, 1, $res['user_id']),
                'eggs' => $eggs
        ];
    }
}