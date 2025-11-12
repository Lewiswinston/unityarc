
import React, { useState } from 'react';
import { MenuIcon, XIcon } from './icons';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#services', label: 'Services' },
        { href: '#portfolio', label: 'Portfolio' },
        { href: '#about', label: 'About' },
        { href: '#reviews', label: 'Reviews' },
        { href: '#contact', label: 'Contact' },
    ];

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = targetId ? document.querySelector(targetId) : null;
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        handleLinkClick(e);
        setIsMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-sm border-b border-gray-700/50">
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <a href="#home" onClick={handleLinkClick} className="text-2xl font-bold text-white">
                        Unity<span className="text-brand-purple">Arc</span>
                    </a>

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a key={link.href} href={link.href} onClick={handleLinkClick} className="text-medium-text hover:text-white transition-colors duration-300">
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <a href="#contact" onClick={handleLinkClick} className="hidden md:inline-block bg-brand-purple text-white font-semibold py-2 px-6 rounded-lg hover:bg-brand-purple-light transition-all duration-300 transform hover:scale-105">
                        Start a Project
                    </a>

                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                            {isMenuOpen ? <XIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 bg-dark-card rounded-lg p-4">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <a key={link.href} href={link.href} onClick={handleMobileLinkClick} className="text-medium-text hover:text-white text-center py-2 rounded-md transition-colors duration-300">
                                    {link.label}
                                </a>
                            ))}
                            <a href="#contact" onClick={handleMobileLinkClick} className="bg-brand-purple text-white font-semibold py-2 px-6 rounded-lg hover:bg-brand-purple-light text-center transition-all duration-300">
                                Start a Project
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;