
import React from 'react';
import { CheckIcon } from './icons';

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    services: string[];
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, services }) => {
    return (
        <div className="bg-dark-card p-8 rounded-xl border border-gray-700/50 shadow-lg hover:border-brand-purple hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center mb-4">
                {icon}
                <h3 className="text-2xl font-bold text-white ml-4">{title}</h3>
            </div>
            <p className="text-medium-text mb-6">{description}</p>
            <ul className="space-y-3">
                {services.map((service, index) => (
                    <li key={index} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-brand-purple mt-1 flex-shrink-0" />
                        <span className="ml-3 text-light-text">{service}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
