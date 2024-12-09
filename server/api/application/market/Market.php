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
            }

            if ($lotInfo['current_cost'] < $userBalance && $newBet <= $userBalance){
                if ($newBet - $lotInfo['step_cost'] >= $lotInfo['current_cost'] || $lotInfo['start_cost'] == $lotInfo['current_cost']){
                    return $this->db->makeBet($userId, $lotInfo['id'], $newBet);
                }
                return ['error' => 3014];
            }
            return ['error' => 3017];
        }
        return ['error' => 3015];
    }
    
    public function sell($userId, $inventoryInfo, $objectId, $resourceAmount){
        $sellingResource = $this->db->getResourcesById($objectId);
        if (!$sellingResource){
            return ['error' => 3008];
        }

        foreach ($inventoryInfo as $item){
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
            }

            if ($resource['name'] === 'Яйцо'){
                $eggsId = $resource['id'];
            }
        }
        //чето бред какой-то вышел, лучше не придумал
        
        $exchangeRate = 50; // курс 50 осколков к 1 яйцу, в идеале доставать этот курс тоже из бд (нет таблицы пока)
        foreach ($inventoryInfo as $item){
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