
import React, { useState, useEffect } from 'react';
import { UpArrowIcon } from './icons';

const BackToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`
                fixed bottom-8 right-8 z-50 p-3 rounded-full bg-brand-purple text-white shadow-lg
                hover:bg-brand-purple-light transition-all duration-300 ease-in-out
                transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-offset-dark-bg focus:ring-brand-purple
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
            `}
            aria-label="Go to top"
        >
            <UpArrowIcon className="h-6 w-6" />
        </button>
    );
};

export default BackToTopButton;