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

    public function getCatalog($isInTown) {
        if ($isInTown) {
            return $this->db->getCatalog();
        }
        return ['error' => 2999];
    }

    public function sell($userId, $inventoryInfo, $objectId, $resourceAmount){
        $sellingResource = $this->db->getResourcesById($objectId); //надо удалить запрос и использовать getResourcesById
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
                $exchangeRate = $resource['exchange_cost'];
            }

            if ($resource['name'] === 'Яйцо'){
                $eggsId = $resource['id'];
            }
        }
        //чето бред какой-то вышел, лучше не придумал
        
        
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