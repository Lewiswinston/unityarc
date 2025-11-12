
import React, { useEffect } from 'react';
import { XIcon } from './icons';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
    title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageUrl, title }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEsc);
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);


    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 animate-fade-in-fast"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="relative bg-dark-card rounded-lg shadow-2xl max-w-4xl max-h-[90vh] w-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <img src={imageUrl} alt={title} className="max-w-full max-h-[90vh] h-auto w-auto object-contain rounded-lg" />
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 text-white bg-dark-bg rounded-full p-2 hover:bg-brand-purple transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple"
                    aria-label="Close image viewer"
                >
                    <XIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};

export default Modal;
