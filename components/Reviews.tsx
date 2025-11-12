
import React, { useState, useRef, useEffect } from 'react';
import { QuoteIcon, XIcon, StarIcon } from './icons';
import ReviewForm from './ReviewForm';

interface Review {
    id: number;
    quote: string;
    name: string;
    title: string;
    avatar: string;
    rating: number;
}

const initialReviews: Review[] = [
    {
        id: 1,
        quote: "UnityArc transformed our online presence. Their attention to detail in both design and development is unmatched. A truly collaborative and creative partner.",
        name: "Sarah Johnson",
        title: "CEO, Innovate Co.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto-format&fit=crop",
        rating: 5,
    },
    {
        id: 2,
        quote: "The team delivered a high-performance e-commerce site that exceeded all our expectations. Our sales have increased significantly since the launch. Highly recommended!",
        name: "Michael Chen",
        title: "Founder, TrendTwin",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto-format&fit=crop",
        rating: 5,
    },
    {
        id: 3,
        quote: "Working with UnityArc was a breeze. They understood our vision perfectly and brought our app interface to life with a stunning and intuitive UI/UX design.",
        name: "Emily Rodriguez",
        title: "Product Manager, TechFlow",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto-format&fit=crop",
        rating: 4,
    },
];

interface ReviewCardProps extends Review {
    isNew?: boolean;
    onDelete: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ quote, name, title, avatar, rating, isNew, onDelete }) => (
    <div className={`relative bg-dark-card p-8 rounded-xl border border-gray-700/50 shadow-lg flex flex-col h-full group ${isNew ? 'animate-new-review-in' : ''}`}>
         <button 
            onClick={onDelete} 
            className="absolute top-3 right-3 text-medium-text hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 p-1 bg-dark-bg/50 rounded-full"
            aria-label="Delete review"
        >
            <XIcon className="h-4 w-4" />
        </button>
        <QuoteIcon className="h-10 w-10 text-brand-purple mb-4" />
        <p className="text-medium-text italic flex-grow">"{quote}"</p>
        <div className="flex items-center mt-6 pt-6 border-t border-gray-700/50">
            <img className="h-12 w-12 rounded-full object-cover" src={avatar} alt={name} />
            <div className="ml-4">
                 <div className="flex items-center mb-1">
                    {Array.from({ length: 5 }, (_, i) => (
                        <StarIcon key={i} filled={i < rating} />
                    ))}
                </div>
                <p className="font-bold text-white">{name}</p>
                <p className="text-sm text-brand-purple-light">{title}</p>
            </div>
        </div>
    </div>
);


const Reviews: React.FC = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newlyAddedId, setNewlyAddedId] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

     useEffect(() => {
        try {
            const storedReviews = localStorage.getItem('unityarc-reviews');
            const parsedReviews = storedReviews ? JSON.parse(storedReviews) : initialReviews;
            setReviews(parsedReviews);
            
            if (!storedReviews) {
                 localStorage.setItem('unityarc-reviews', JSON.stringify(initialReviews));
            }

        } catch (error) {
            console.error("Failed to parse reviews from localStorage", error);
            setReviews(initialReviews);
        }
    }, []);

    const handleAddReview = (newReviewData: Omit<Review, 'id' | 'avatar'>) => {
        const newReview: Review = {
            ...newReviewData,
            id: Date.now(),
            avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
        };
        
        setReviews(prevReviews => {
            const updatedReviews = [newReview, ...prevReviews];
            localStorage.setItem('unityarc-reviews', JSON.stringify(updatedReviews));
            return updatedReviews;
        });
        setNewlyAddedId(newReview.id);
    };

     const handleDeleteReview = (id: number) => {
        setDeletingId(id);
        setTimeout(() => {
            setReviews(prevReviews => {
                const updatedReviews = prevReviews.filter(review => review.id !== id);
                localStorage.setItem('unityarc-reviews', JSON.stringify(updatedReviews));
                return updatedReviews;
            });
            setDeletingId(null);
        }, 500); // Corresponds to animation duration
    };

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

    return (
        <section id="reviews" className="py-20 bg-dark-bg scroll-mt-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white">What Our Clients Say</h2>
                    <p className="text-medium-text mt-2">Real feedback from our valued partners.</p>
                </div>
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div
                            key={review.id}
                            className={`
                                transition-all duration-500 ease-out 
                                ${deletingId === review.id ? 'animate-review-out' : ''}
                                ${isVisible && !newlyAddedId && !deletingId ? 'opacity-100 translate-y-0' : newlyAddedId === review.id ? 'opacity-100' : isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}
                            `}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <ReviewCard {...review} isNew={newlyAddedId === review.id} onDelete={() => handleDeleteReview(review.id)} />
                        </div>
                    ))}
                </div>

                <div className="mt-20">
                    <ReviewForm onAddReview={handleAddReview} />
                </div>
            </div>
        </section>
    );
};

export default Reviews;
