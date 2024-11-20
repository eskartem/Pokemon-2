<?php

class Map {

    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function isUserInTown($user) {
        return true; // просто заглушка
    }


    public function getMap($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $mapData = $this->db->getMap();
            //хз, имеет ли вообще смысл писать этот кал, просто хочется чтобы к бд обращались только внутри класса DB
            if ($mapData) {
                return $mapData;
            } else {
                return ['error' => 9000];
            }
        }
        return ['error' => 9000, 'message' => 'Зарегестрируйтесь или войдите для просмотра карты.'];
    }
    
    public function startGame($token) {
        $user = $this->db->getUserByToken($token);
        if (!$user) {
            return ['error' => 404]; 
        }

        if ($this->isUserInTown($user)) {
            return ['message' => 'Вы уже находитесь в городе.']; 
        }

        // Логика спавна - игрок появляется в городе, не знаю как правильно это расписать
        // $user->db-> ...= 'town'; 
        $this->db->updateUserPosition($user); // Обновляем местоположение в базе данных

        return [
            'message' => 'Вы успешно зашли в игру и появились в городе.',
        ];
    }

    public function endGame($token) {
        $user = $this->db->getUserByToken($token);
        if (!$user) {
            return ['error' => 404]; 
        }

        // Проверяем, находится ли игрок в городе
        if (!$this->isUserInTown($user)) {
            // Игрок выходил из карты не в городе - теряет некоторые ресурсы
            $this->db->clearUserResource($user); 
            return ['message' => 'Вы вышли из карты не в городе и потеряли некоторые ресурсы.'];
        }

        // Если игрок в городе, он ничего не теряет
        return ['message' => 'Вы успешно вышли из игры.'];

    }

    public function moveUser($id, $x, $y, $status) {
        $position = [$x, $y];
        $this->db->updateUserPosition($id, $position);
        return true;
        /*
        // это тот самый эндгейм?
        if ($status == 'scout'){
            //если надо будет переместить юзера как-то вне скаутинга, то вообще убрать этот if
            $position = [$x, $y];
            $this->db->updateUserPosition($id, $position);
            return true;
        }
        if ($status == 'fight'){
            return ['error' => 9000, 'message' => 'Невозможно перемещаться во время боя.']
        }
        //перемещать в город (на x=80, y=45), если игрок оффлайн??
        return ['error' => 9000, 'message' => 'Невозможно перемещаться. Игрок не в игре.']
        */
    }
}