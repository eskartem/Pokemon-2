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

    public function sell($userId, $marketType, $inventoryInfo, $lotExtra, $objectId, $resourceAmount){
        if ($marketType === 'merchant'){
            $sellingResource = $this->db->getResourcesById($objectId);
            if (!$sellingResource){
                return ['error' => 3008];
            }

            foreach ($inventoryInfo as $item){
                if ($item['resource_id'] === $objectId){
                    if ($resourceAmount <= $item['resource_amount']){
                        //изменить названия в зависимости от бд
                        if ($sellingResource->name === 'Кристалл'){
                            return $this->db->sellResources($sellingResource->id, $resourceAmount);
                        }
                        
                        if ($sellingResource->name === 'Осколки Яиц'){
                            return $this->db->sellResources($sellingResource->id, $resourceAmount);
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
            $sellingResource = $this->db->getResourcesById($objectId);
            if (!$sellingResource){
                return ['error' => 3008];
            }

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

        if ($marketType === 'lot'){
            if ($lotExtra === 'pokemon'){

            }

            if ($lotExtra === 'item'){
                $sellingResource = $this->db->getResourcesById($objectId);
                if (!$sellingResource){
                    return ['error' => 3008];
                }
                /*
                ОЧЕНЬ ВАЖНО
                удалить любые упоминания про покемонов и лоты тут, 
                реализовать все в методе makeLot, 
                перенести селлинг ресурс до ифов
                раз селл остается только про торговца и обменник, то можно не передавать обжектАйди, а только ресурсНейм
                значительно упрощает весь пиздец, написанный в этом методе
                я убью себя
                ЕСЛИ тут остается что-то про лоты, то бросать метод создания лота только для предметов в этом параметре (маловероятно)
                апдейт лот находится внутри мейклот, создает хэш когда кто-то делает действие на рынке -> добавить в бай обновление хэшей тоже
                или делать обновление постоянно, как чат, тогда не надо в бай
                */
                //$this->makeLot($objectId);
            }
            
        }
    }

}