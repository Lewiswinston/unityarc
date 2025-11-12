
import React, { useState, useRef, useEffect } from 'react';
import Modal from './Modal';
import { XIcon } from './icons';

interface PortfolioItemProps {
    imageUrl: string;
    title: string;
    category: string;
    linkUrl?: string;
    onClick: () => void;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ imageUrl, title, category, linkUrl, onClick }) => {
    const content = (
        <div className={`group relative overflow-hidden rounded-lg shadow-lg aspect-[3/4] ${!linkUrl ? 'cursor-pointer' : ''}`}>
            <img src={imageUrl} alt={title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{title}</h3>
                <p className="text-brand-purple-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">{category}</p>
            </div>
        </div>
    );
    
    if (linkUrl) {
        return (
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                {content}
            </a>
        );
    }
    
    return (
        <button onClick={onClick} className="text-left w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg focus:ring-brand-purple rounded-lg">
           {content}
       </button>
    );
};

const Portfolio: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<{ imageUrl: string; title: string } | null>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = gridRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);


    const portfolioItems = [
        { imageUrl: "https://querulous-fuchsia-1h33a60mfg.edgeone.app/Gold%20And%20Brown%20Elegant%20Grand%20Opening%20Invitation%20(5).jpg", title: "Grand Opening Invitation", category: "Design" },
        { imageUrl: "https://sad-crimson-govmxk7tff.edgeone.app/Black%20Red%20Simple%20Horror%20Movie%20Poster%20(5).jpg", title: "Web Series Poster", category: "Design" },
        { imageUrl: "https://patient-orange-e94wd8uaqm.edgeone.app/Design%20(1).jpg", title: "Sports Event Poster", category: "Design" },
        { imageUrl: "https://similar-indigo-ejrw6t0qun.edgeone.app/Screenshot%202025-11-12%20101209.png", title: "E-commerce Website", category: "Development", linkUrl: "https://lewiswinston.github.io/trend_twin/" },
        { imageUrl: "https://abstract-blush-uwvjgu1ams.edgeone.app/Blue%20Bold%20Night%20of%20Worship%20Poster.png", title: "Workshop Event Poster", category: "Design" },
        { imageUrl: "https://governing-beige-4xnrmjawiu.edgeone.app/Screenshot%202025-11-12%20102126.png", title: "UI/UX Interface", category: "Design" },
    ];

    const handleItemClick = (item: typeof portfolioItems[0]) => {
        if (!item.linkUrl) {
            setSelectedItem({ imageUrl: item.imageUrl, title: item.title });
        }
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    return (
        <>
            <section id="portfolio" className="py-20 bg-dark-bg scroll-mt-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white">Our Recent Work</h2>
                        <p className="text-medium-text mt-2">A glimpse into our passion for creation.</p>
                    </div>
                    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolioItems.map((item, index) => (
                           <div
                                key={item.title}
                                className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <PortfolioItem {...item} onClick={() => handleItemClick(item)} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {selectedItem && (
                 <Modal
                    isOpen={!!selectedItem}
                    onClose={closeModal}
                    imageUrl={selectedItem.imageUrl}
                    title={selectedItem.title}
                />
            )}
        </>
    );
};

export default Portfolio;