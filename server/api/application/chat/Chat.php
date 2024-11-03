<?php   

class Chat{
    private $db = new DB();
    
    function __construct($db) {
        $this->db = $db;
    }

    public function sendMessage($userId, $message) {
        $this->db->addMessage($userId, $message);
        $this->db->updateChatHash(md5(rand()));
        return true;
    }

    public function getMessages($hash) {
        $currentHash = $this->db->getChatHash();
        if ($hash === $currentHash->chat_hash) {
            return [
                'hash' => $hash
            ];
        }
        $messages = $this->db->getMessages();
        return [
            'messages' => $messages,
            'hash' => $currentHash->chat_hash
        ];
    }
}
