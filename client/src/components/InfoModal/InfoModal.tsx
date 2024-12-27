import React, { useContext, ReactNode  } from 'react';
import Button from '../../components/Button/Button';
import { ServerContext } from '../../App';
import './InfoModal.scss';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string | ReactNode; 
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, content }) => {
    const server = useContext(ServerContext);

    if (!isOpen) return null;

    return (
        <div className="info-modal-overlay">
            <div className="info-modal">
                <h2>{title}</h2>
                <p>{content}</p> 
                <Button text="Закрыть" onClick={onClose} />
            </div>
        </div>
    );
};

export default InfoModal;