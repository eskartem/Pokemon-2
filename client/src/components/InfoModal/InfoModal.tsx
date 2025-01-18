import React, { useContext, ReactNode } from 'react';
import Button from '../../components/Button/Button';
import { ServerContext } from '../../App';
import './InfoModal.scss';

interface InfoModalProps {
    id?: string;
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string | ReactNode;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, content }) => {
    const server = useContext(ServerContext);

    if (!isOpen) return null;

    return (
        <div className="info-modal-overlay" id="test-info-modal-overlay">
            <div className="info-modal" id="test-info-modal">
                <h2 id="test-info-modal-title">{title}</h2>
                <p id="test-info-modal-content">{content}</p>
                <Button
                    id="test-info-modal-close-button"
                    text="Закрыть"
                    onClick={onClose}
                />
            </div>
        </div>
    );
};

export default InfoModal;