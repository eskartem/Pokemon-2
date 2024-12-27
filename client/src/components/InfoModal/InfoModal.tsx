import React from 'react';
import './InfoModal.scss'; 

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
        <div className="info-modal-overlay">
            <div className="info-modal">
                <h2>{title}</h2>
                <p>{content}</p>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default InfoModal;