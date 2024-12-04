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

    public function sell($userId, $marketType, $inventoryInfo, $objectId, $resourceAmount){
        $sellingResource = $this->db->getResourcesById($objectId);
        if (!$sellingResource){
            return ['error' => 3008];
        }

        $merchantCosts = [
            'crystals' => 10,
            'shells' => 20,
            'eggs' => $merchantCosts['shells'] * 50      //курс 50 скорлуп = 1 яйцо
        ];
        if ($marketType === 'merchant'){
            foreach ($inventoryInfo as $item){
                if ($item['resource_id'] === $objectId){
                    if ($resourceAmount <= $item['resource_amount']){
                        //изменить названия в зависимости от бд
                        if ($sellingResource->name === 'Кристалл'){
                            return $this->db->sellResources($sellingResource->id, $resourceAmount);
                        }
                        
                        if ($sellingResource->name === 'Осколки Яиц'){
                            return ['resDecrease' => $this->db->sellResources($sellingResource->id, $resourceAmount),
                                    'moneyIncrease' => $this->db->changeMoney($userId, $merchantCosts['shells']*$resourceAmount).
                                    'message' => [$merchantCosts['shells'], $resourceAmount]
                                    ];
                        }
                        
                        if ($sellingResource->name === 'Яйцо'){
                            return $this->db->sellResources($sellingResource->id, $resourceAmount);
                        }
                        //в каждый из этих ифов пихнуть начисление монет 
                    }
                    return ['error' => 3009];
                }
            }
            
            
        }

        if ($marketType === 'exchanger'){
            foreach ($inventoryInfo as $item){
                if ($item['resource_id'] === $objectId){
                    if ($resourceAmount <= $item['resource_amount']){
                        //изменить названия в зависимости от бд
                        if ($sellingResource->name === 'Осколки Яиц'){
                            return $this->db->sellResources($sellingResource->id, $resourceAmount);
                            //начислить яйца по количеству осколков, бросать ошибку / не давать выбирать значения, если остаток не равен нулю
                        }
                    }
                    return ['error' => 3009];
                }
            }
        }

       
    }

}