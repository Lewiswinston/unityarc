
import React, { useEffect } from 'react';
import { XIcon, RocketIcon } from './icons';

interface UpcomingPageProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
}

const UpcomingPage: React.FC<UpcomingPageProps> = ({
    isOpen,
    onClose,
    title = "Launching Soon!",
    description = "We're working hard to bring this feature to life. Stay tuned for exciting updates. This page will be ready for takeoff shortly!"
}) => {
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
            className="fixed inset-0 bg-dark-bg/90 z-[100] flex items-center justify-center p-4 animate-fade-in-fast"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="relative bg-dark-card rounded-xl shadow-2xl max-w-lg w-full text-center p-8 md:p-12 border border-gray-700/50"
                onClick={(e) => e.stopPropagation()}
            >
                 <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-medium-text hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple rounded-full p-1"
                    aria-label="Close this page"
                >
                    <XIcon className="h-6 w-6" />
                </button>

                <div className="mb-6">
                    <div className="inline-block p-4 bg-dark-bg rounded-full">
                         <RocketIcon className="h-16 w-16 text-brand-purple animate-bounce" />
                    </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
                <p className="text-medium-text mb-8">{description}</p>
                
                <button
                    onClick={onClose}
                    className="bg-brand-purple text-white font-semibold py-3 px-8 rounded-lg hover:bg-brand-purple-light transition-all duration-300 transform hover:scale-105"
                >
                    Got It, Go Back
                </button>
            </div>
        </div>
    );
};

export default UpcomingPage;