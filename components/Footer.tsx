
import React from 'react';
import { TwitterIcon, LinkedInIcon, GitHubIcon, FacebookIcon, InstagramIcon } from './icons';

interface FooterProps {
    onUpcomingFeatureClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onUpcomingFeatureClick }) => {
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = targetId ? document.querySelector(targetId) : null;
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const socialLinks = [
        { label: "Twitter", icon: <TwitterIcon />, action: onUpcomingFeatureClick },
        { label: "LinkedIn", icon: <LinkedInIcon />, action: onUpcomingFeatureClick },
        { label: "GitHub", icon: <GitHubIcon />, action: onUpcomingFeatureClick },
        { label: "Instagram", icon: <InstagramIcon />, action: onUpcomingFeatureClick },
        { label: "Facebook", icon: <FacebookIcon />, action: onUpcomingFeatureClick },
    ];

    return (
        <footer className="bg-dark-card border-t border-gray-700/50">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-6">
                    <a href="#home" onClick={handleLinkClick} className="text-2xl font-bold text-white">
                        Unity<span className="text-brand-purple">Arc</span>
                    </a>
                    <div className="flex items-center space-x-6 text-medium-text">
                        <a href="#services" onClick={handleLinkClick} className="hover:text-white transition-colors">Services</a>
                        <a href="#portfolio" onClick={handleLinkClick} className="hover:text-white transition-colors">Portfolio</a>
                        <a href="#about" onClick={handleLinkClick} className="hover:text-white transition-colors">About</a>
                        <a href="#reviews" onClick={handleLinkClick} className="hover:text-white transition-colors">Reviews</a>
                    </div>
                    <div className="flex items-center space-x-4">
                        {socialLinks.map(link => (
                            <button
                                key={link.label}
                                onClick={link.action}
                                aria-label={link.label}
                                className="text-medium-text hover:text-white transition-colors duration-300 transform hover:scale-110"
                            >
                                {link.icon}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="border-t border-gray-700/50 pt-6 text-center text-medium-text text-sm opacity-0 animate-fade-in">
                    &copy; {new Date().getFullYear()} UnityArc. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;