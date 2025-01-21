<?php

class Answer {
    static $CODES = array(
        '101' => 'Param method not setted',
        '102' => 'Method not found',
        '242' => 'Params not set fully',
        '705' => 'User is not found',
        '1001' => 'Is it unique login?',
        '1002' => 'Wrong login or password',
        '1003' => 'Error to logout user',
        '1004' => 'Error to register user',
        '1005' => 'User is no exists',
        '404' => 'not found',
        '605' => 'invalid teamId',
        '700' => 'No skins',
        '701' => 'Skin is not found',
        '702' => 'pokemon is not found',
        '703' => 'max level pokemon',
        '704' => 'action is not found',
        '706' => 'text message is empty',
        '707' => 'could not send message', // e-mail;
        '708' => 'invalid code from E-mail',
        '709' => ' session did not start or you need to use previous method',
        '800' => 'not found object',
        '801' => 'unknown state',
        '802' => 'lack of funds', //не хватает средств
        '850' => 'incorrect array output',
        '1006' => 'user with this email is already registered',
        '1449' => 'this monster is already in your team',
        '1450' => 'this monster is on sale, cannot be put in the team',
        '1460' => 'monster with that ID has not been found',
        '1461' => 'you do not own that monster',
        '2001' => 'coordinates to move are not set',
        '2002' => 'coordinates to move are not correct',
        '2003' => 'coordinates to move are out of map borders',
        '2004' => 'cannot move to the same coordinates',
        '2005' => 'cannot move during the combat or offline',
        '2999' => 'user is not in town',
        '3001' => 'incorrect "type" parameter',
        '3002' => 'incorrect "amount" parameter',
        '3003' => 'incorrect "startCost" or "stepCost" parameter', 
        '3004' => 'unable to sell monster if you will have less than 3 monsters', 
        '3005' => 'this lot does not belong to you',
        '3006' => 'no eggs to hatch',
        '3007' => 'inventory of that user has not been found',
        '3008' => 'selling object with that ID has not been found',
        '3009' => 'not enough resources to sell that amount',
        '3010' => 'that amount of shells cannot be exchanged',
        '3011' => 'not enough shells to exchange that amount',
        '3012' => 'cannot make bet to the your own lot',
        '3013' => 'you have to increase your bet to make a new one',
        '3014' => 'new bet is lesser than the step',
        '3015' => 'this lot has been closed already',
        '3016' => 'this lot does not exist',
        '3017' => 'you do not have enough currency to buy this',
        '4000' => 'You can not attack your monster',
        '4001' => 'You can not attack with a dead monster',
        '4002' => 'cannot enter the battle in the town',
        '4003' => 'this user is already in battle',
        '4004' => 'battle not found',
        '4005' => 'battle already ended',
        '9000' => 'unknown error'
    );

    static function response($data) {
        if ($data) {
            if (!is_bool($data) && array_key_exists('error', $data)) {
                $code = $data['error'];
                return [
                    'result' => 'error',
                    'error' => [
                        'code' => $code,
                        'text' => self::$CODES[$code]
                    ]
                ];
            }
            return [
                'result' => 'ok',
                'data' => $data
            ];
        }
        $code = 9000;
        return [
            'result' => 'error',
            'error' => [
                'code' => $code,
                'text' => self::$CODES[$code]
            ]
        ];
    }
}