import React from 'react';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-20 bg-dark-bg scroll-mt-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-white">Let's Build Something Amazing</h2>
                <p className="text-medium-text mt-4 max-w-2xl mx-auto">
                    Have a project in mind? We'd love to hear about it. Reach out to us and let's start the conversation.
                </p>
                <div className="mt-8">
                    <a href="mailto:unityarc17@gmail.com" className="bg-brand-purple text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-brand-purple-light transition-all duration-300 transform hover:scale-105 inline-block animate-pulse-glow">
                        Contact Us
                    </a>
                </div>
                 <p className="text-medium-text mt-6">
                    Or email us directly at: <a href="mailto:unityarc17@gmail.com" className="text-brand-purple-light hover:underline">unityarc17@gmail.com</a>
                </p>
            </div>
        </section>
    );
};

export default Contact;