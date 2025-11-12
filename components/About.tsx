import React, { useState, useRef, useEffect } from 'react';
import { CheckIcon } from './icons';

const About: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null);
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
        const currentRef = contentRef.current;
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
        <section id="about" className="py-20 bg-dark-card scroll-mt-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white">About UnityArc</h2>
                    <div className="w-24 h-1 bg-brand-purple mx-auto mt-4"></div>
                </div>

                <div
                    ref={contentRef}
                    className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-4">Our Mission & Vision</h3>
                        <p className="text-lg text-medium-text leading-relaxed mb-6">
                            At UnityArc, our name reflects our core philosophy: unifying stunning design and robust development into a single, cohesive arc to create seamless digital masterpieces. We are a team of passionate creators, thinkers, and builders dedicated to pushing boundaries and delivering excellence.
                        </p>
                        <p className="text-lg text-medium-text leading-relaxed mb-8">
                            Our mission is to empower businesses by crafting unique digital experiences that not only look beautiful but also perform flawlessly. We believe in building partnerships with our clients, ensuring that every project is a collaborative journey towards success.
                        </p>

                        <h4 className="text-2xl font-semibold text-white mb-4">Our Core Values</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <CheckIcon className="h-6 w-6 text-brand-purple mt-1 flex-shrink-0" />
                                <span className="ml-3 text-light-text"><span className="font-semibold">Collaboration:</span> We work with you, not just for you.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckIcon className="h-6 w-6 text-brand-purple mt-1 flex-shrink-0" />
                                <span className="ml-3 text-light-text"><span className="font-semibold">Innovation:</span> We constantly explore new technologies and creative approaches.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckIcon className="h-6 w-6 text-brand-purple mt-1 flex-shrink-0" />
                                <span className="ml-3 text-light-text"><span className="font-semibold">Quality:</span> We are committed to delivering polished, pixel-perfect results.</span>
                            </li>
                             <li className="flex items-start">
                                <CheckIcon className="h-6 w-6 text-brand-purple mt-1 flex-shrink-0" />
                                <span className="ml-3 text-light-text"><span className="font-semibold">Integrity:</span> We believe in transparency and honest communication.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;