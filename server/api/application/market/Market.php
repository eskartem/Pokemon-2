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
        return ['error' => 2999];
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

}