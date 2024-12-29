<?php
require_once ('db/DB.php');
require_once ('user/User.php');
require_once ('chat/Chat.php');

class Application {
    private $user;
    private $chat;
    function __construct() {
        $db = new DB();
        $this->user = new User($db);
        $this->chat = new Chat($db);
    }

    public function login($params) {
        if ($params['login'] && $params['hash'] && $params['rnd']) {
            return $this->user->login($params['login'], $params['hash'], $params['rnd']);
        }
        return ['error' => 242];
    }

    public function logout($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->user->logout($params['token']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function registration($params) {
        if ($params['login'] && $params['hash'] && $params['name'] && 
        $params['family_name'] && $params['surname'] && $params['group'] && $params['status']  ) {
            return $this->user->registration($params['login'], $params['hash'], $params['name'], 
            $params['family_name'], $params['surname'], $params['group'], $params['status']);
        }
        return ['error' => 242];
    }

    public function sendMessage($params) {
        if ($params['token'] && $params['message']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->chat->sendMessage($user->id, $params['message']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function getMessages($params) {
        if ($params['token'] && $params['hash']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->chat->getMessages($params['hash']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function getGroupList($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->user->getGroupList();
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function getGroupMembers($params) {
        if ($params['token'] && $params['class_id']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->user->getGroupMembers($params['class_id']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

}