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
             case 'updradePokemon': return $app-> upgradePokemon($params);
            //inventory

            //battle
            // case 'updateBattle': return $app-> updateBattle($params); // loop //получаю данные по всем игрокам
            // case 'endBattle': return $app-> endBattle($params);
            // case 'actionUser': return $app-> actionUser($params); //действие игрока в бою во время ход
            //map
            case 'getMap': return $app-> getMap($params);
            case 'startGame': return $app-> startGame($params);
            case 'endGame': return $app-> endGame($params);

            case 'updateScene': return $app-> updateScene($params); //loop
            case 'moveUser': return $app-> moveUser($params);//надо уметь бросать энд гейм

            //market
            case 'getMarket': return $app-> getMarket($params);
            case 'buy': return $app->buy($params);
            // case 'sale': return $app-> sale($params);

            default: return ['error' => 102];
        }
    }
    return ['error' => 101];
}

echo json_encode(Answer::response(result($_GET)), JSON_UNESCAPED_UNICODE);
