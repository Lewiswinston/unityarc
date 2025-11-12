import React from 'react';

const Hero: React.FC = () => {
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = targetId ? document.querySelector(targetId) : null;
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
             <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
            </div>
            <div className="absolute inset-0 bg-dark-bg/60 z-10"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-dark-bg via-transparent to-dark-bg z-10"></div>
            <div className="relative z-20 container mx-auto px-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    Crafting Digital Experiences <br /> that <span className="text-brand-purple">Inspire</span>
                </h1>
                <p className="text-lg md:text-xl text-medium-text max-w-3xl mx-auto mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    We are UnityArc — a creative agency crafting custom design and development solutions that turn ideas into extraordinary digital experiences.
                </p>
                <a href="#contact" onClick={handleLinkClick} className="bg-brand-purple text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-brand-purple-light transition-all duration-300 transform hover:scale-105 inline-block opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                    Let's Build Together
                </a>
            </div>
        </section>
    );
};

export default Hero;