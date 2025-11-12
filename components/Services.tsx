import React, { useState, useRef, useEffect } from 'react';
import { ServiceCard } from './ServiceCard';
import { DesignIcon, CodeIcon } from './icons';

const Services: React.FC = () => {
    const designServices = [
        "App Interface Design (UI/UX)",
        "Brand Identity & Logo Design",
        "Promotional Posters & Graphics",
        "Custom E-Invitations",
        "Social Media Creatives"
    ];

    const devServices = [
        "Responsive Website Development",
        "E-commerce Solutions",
        "Content Management Systems (CMS)",
        "Web Application Development",
        "Performance Optimization & SEO"
    ];

    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );
        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <section id="services" className="py-20 bg-dark-bg scroll-mt-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white">Our Services</h2>
                    <p className="text-medium-text mt-2">What we do best to help you succeed.</p>
                </div>
                <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <ServiceCard
                            icon={<DesignIcon className="h-10 w-10 text-brand-purple" />}
                            title="Creative Design"
                            description="We craft visually stunning and user-centric designs that captivate your audience and elevate your brand."
                            services={designServices}
                        />
                    </div>
                    <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
                        <ServiceCard
                            icon={<CodeIcon className="h-10 w-10 text-brand-purple" />}
                            title="Web Development"
                            description="We build robust, scalable, and high-performance websites and applications tailored to your specific needs."
                            services={devServices}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;