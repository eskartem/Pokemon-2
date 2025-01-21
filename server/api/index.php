<?php

error_reporting(1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once('application/Answer.php');
require_once('application/Application.php');

function result($params) {
    $method = $params['method'];
    if ($method) {
        $app = new Application();
        switch ($method) {
            //user
            case 'login': return $app->login($params);
            case 'logout': return $app->logout($params);
            case 'registration': return $app->registration($params);
            // chat
            case 'sendMessage': return $app->sendMessage($params);//loop
            case 'getMessages': return $app->getMessages($params);
            //gamer info

             case 'userInfo': return $app-> userInfo($params);
        
            //inventory
            case 'getInventory': return $app->getInventory($params);
            case 'addToTeam': return $app->addToTeam($params);
            case 'upgradePokemon': return $app->upgradePokemon($params); 
            case 'getInfoAboutUpgrade': return $app->getInfoAboutUpgrade($params);
            case 'getAttackPokemon': return $app->getAttackPokemon($params);

            
            //battle
            case 'getInfoMonster': return $app->getInfoMonster($params);
            case 'startBattle': return $app->startBattle();
            case 'updateBattle': return $app-> updateBattle($params); // loop //получаю данные по всем игрокам
            case 'endBattle': return $app->endBattle($params);
            case 'actionUser': return $app-> actionUser($params); //действие игрока в бою во время ход
            //map
            case 'getMap': return $app->getMap($params);
            //case 'startGame': return $app-> startGame($params);
            //case 'endGame': return $app-> endGame($params);

            case 'updateScene': return $app->updateScene($params);
            case 'moveUser': return $app->moveUser($params);

            //market                   
            case 'makeBet': return $app->makeBet($params);
            case 'getCatalog': return $app->getCatalog($params); // для торговца
            case 'updateLots': return $app->updateLots($params);
            case 'cancelLot': return $app->cancelLot($params);
            case 'makeLot': return $app->makeLot($params);
            case 'sell': return $app->sell($params);
            
            default: return ['error' => 102];
        }
        
    }
    return ['error' => 101];
}

echo json_encode(Answer::response(result($_GET)), JSON_UNESCAPED_UNICODE);
