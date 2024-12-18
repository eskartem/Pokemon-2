<?php

class Market {

    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function getAllLots($isInTown) {
        if ($isInTown) {
            return $this->db->getAllLots();
        }
        return false;
    }

    public function makeBet($userId, $userBalance, $lotInfo, $newBet){
        if ($lotInfo['status'] === 'open'){  
            if ($userId == $lotInfo['seller_id']){
                return ['error' => 3012];
            }

            if ($lotInfo['buyer_id'] == $userId && $lotInfo['current_cost'] == $newBet){
                return ['error' => 3013]; // можно сделать ставку на лот, на котором уже есть твоя ставка, только если новая ставка будет больше
                
                //нахуя я это написал, если оно в любом случае не будет проходить, т.к. step_cost не собдлюден ???
            }

            if ($lotInfo['current_cost'] < $userBalance && $newBet <= $userBalance){
                if ($newBet - $lotInfo['step_cost'] >= $lotInfo['current_cost'] || $lotInfo['start_cost'] == $lotInfo['current_cost']){
                    if ($lotInfo['buyer_id'] != NULL){
                        $this->db->changeMoney($lotInfo['buyer_id'], $lotInfo['current_cost']);
                    }
                    return $this->db->makeBet($userId, $lotInfo['id'], $newBet);
                }
                return ['error' => 3014];
            }
            return ['error' => 3017];
        }
        return ['error' => 3015];
    }
    
    public function makeLotMonster($user, $sellingItemId, $startCost, $stepCost) {
        $zalog = (int)$startCost / 100 * 5; // 5%
        $zalog = ceil($zalog);

        if ($user->money < $zalog){
            return ['error' => 802];
        }

        if ($zalog < 5){
            $zalog = 5; 
        }

        return $this->db->makeLotMonster($user->id, $sellingItemId, $startCost, $stepCost, $zalog);
    }

    public function makeLotItem($user, $sellingItemId, $startCost, $stepCost, $amount) {
        $zalog = (int)$startCost / 100 * 5; // 5%
        $zalog = ceil($zalog);

        if ($user->money < $zalog){
            return ['error' => 802];
        }

        if ($zalog < 5){
            $zalog = 5; 
        }

        return $this->db->makeLotItem($user->id, $sellingItemId, $startCost, $stepCost, $amount, $zalog);
    }

    public function getCatalog($isInTown) {
        if ($isInTown) {
            return $this->db->getCatalog();
        }
        return ['error' => 2999];
    }

    public function sell($userId, $inventoryInfo, $objectId, $resourceAmount){
        $sellingResource = $this->db->getResourcesById($objectId); //надо удалить запрос и использовать getResources
        if (!$sellingResource){
            return ['error' => 3008];
        }

        foreach ($inventoryInfo['inventory'] as $item){
            if ($item['resource_id'] === (int)$objectId){
                if ($resourceAmount <= $item['resource_amount']){
                    return ['resDecrease' => $this->db->sellResources($sellingResource->id, $resourceAmount, $userId),
                            'moneyIncrease' => $this->db->changeMoney($userId, $sellingResource->cost * $resourceAmount),
                            'message' => [$sellingResource, $resourceAmount] // чтобы на фронтенде выводить "продано N ресурсов за M денег" ??????????
                    ];
                }
                return ['error' => 3009];
            }
        }
        
    }

    public function exchange($userId, $inventoryInfo, $resourceAmount){
        $sellingResource = $this->db->getResources();
        foreach ($sellingResource as $resource){
            if ($resource['name'] === 'Скорлупа'){
                $shellsId = $resource['id'];
                $exchangeRate = $resource['exchange_cost'];
            }

            if ($resource['name'] === 'Яйцо'){
                $eggsId = $resource['id'];
            }
        }
        //чето бред какой-то вышел, лучше не придумал
        
        foreach ($inventoryInfo['inventory'] as $item){
            if ($item['resource_id'] === (int)$shellsId){
                if ($resourceAmount <= $item['resource_amount']){
                    if ($resourceAmount % $exchangeRate === 0){ 
                        return ['resDecrease' => $this->db->sellResources($shellsId, $resourceAmount, $userId),
                                'eggIncrease' => $this->db->sellResources($eggsId, -($resourceAmount / 50), $userId), //поменять название методу ахахахах, а то начисление - это отрицательная продажа
                                'message' => $resourceAmount 
                        ];
                    }
                    return ['error' => 3010];
                }
                return ['error' => 3011];
            }
        }     
    }

    public function updateLots($hash, $lots){
        $currentHash = $this->db->getHash();
        if ($hash === $currentHash->market_hash) {
            return [
                'hash' => $hash
            ];
        }

        $allLots = [];
        foreach ($lots as $filteredLots){
            if ($filteredLots['status'] == 'open'){
                $lotDatetime = new DateTime($filteredLots['datetime']);
                $currentDatetime = new DateTime();
                $interval = $lotDatetime->diff($currentDatetime);
                if ($interval->days == 0 && $interval->h == 0 && $interval->i < 5) {
                } else {
                    $this->db->changeLotStatus('closed', $filteredLots['id']);
                    if ($filteredLots['buyer_id'] == NULL){
                        if ($filteredLots['type'] == 'monster'){
                            $this->db->changeMonsterOwner($filteredLots['selling_id'], $filteredLots['seller_id']);
                        } else {
                            $this->db->sellResources($filteredLots['selling_id'], -($filteredLots['amount']), $filteredLots['seller_id']);
                            // поменять название на что-то более общее, возможно немного поменять, т.к. отрицательное число для начисления, а положительное для списывания
                        }
                    } else {
                        if ($filteredLots['type'] == 'monster'){
                            $this->db->changeMonsterOwner($filteredLots['selling_id'], $filteredLots['buyer_id']);
                        } else {
                            $this->db->sellResources($filteredLots['selling_id'], -($filteredLots['amount']), $filteredLots['buyer_id']);
                        }
                        $returningMoney = ceil((int)($filteredLots['start_cost']) / 100 * 5) + (int)($filteredLots['current_cost']); // возможно залог тоже надо хранить в таблице лотов
                        $this->db->changeMoney($filteredLots['seller_id'], $returningMoney);
                    }
                }
            }
            $allLots[] = $filteredLots;
            $frontendLots = [];
            foreach ($allLots as $lot) {
                $frontendLots[] = [
                    'id' => $lot['id'],
                    'datetime' => $lot['datetime'],
                    'start_cost' => $lot['start_cost'],
                    'step_cost' => $lot['step_cost'],
                    'current_cost' => $lot['current_cost'],
                    'type' => $lot['type'],
                    'resource' => $lot['resource'],
                    'amount' => $lot['amount'],
                    'monster_level' => $lot['monster_level'],
                    'monster_name' => $lot['monster_name'],
                    'current_monster_hp' => $lot['current_monster_hp'],
                    'max_HP' => $lot['max_HP'],
                    'ATK' => $lot['ATK'],
                    'DEF' => $lot['DEF'],
                    'status' => $lot['status'],
                ];
            }


        }
        return ['all_lots' => $frontendLots,
                'hash' => $hash
        ];
    }

    public function cancelLot($lotId, $lots, $user){
        foreach ($lots as $lot){
            if ($lot['id'] == $lotId){                
                if ($lot['status'] == 'open'){
                    if ($lot['seller_id'] == $user->id){
                        return ['ableToCancel' => $this->db->changeLotStatus('cancelled', $lot['id']),
                                'ableToReturnToOwner' => match ($lot['type']) {
                                    'item' => $this->db->sellResources($lot['selling_id'], -($lot['amount']), $lot['seller_id']),
                                    'monster' => $this->db->changeMonsterOwner($lot['selling_id'], $lot['seller_id']),
                                },
                                'ableToReturnBet' => match (true) {
                                    $lot['buyer_id'] !== null => $this->db->changeMoney($lot['buyer_id'], $lot['current_cost']),
                                    default => 'нет ставок на этом лоте',
                                }
                        ];
                    }
                    return ['error' => 3005];    
                }
                return ['error' => 3015];
            }
        }
        return ['error' => 3016];
    }
}