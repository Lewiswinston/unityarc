
import React, { useState } from 'react';
import { StarIcon } from './icons';

interface ReviewFormProps {
    onAddReview: (review: { name: string; title: string; quote: string; rating: number; }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onAddReview }) => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [quote, setQuote] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !title.trim() || !quote.trim()) {
            setError('All text fields are required.');
            return;
        }
        if (rating === 0) {
            setError('Please select a star rating.');
            return;
        }
        setError('');
        onAddReview({ name, title, quote, rating });
        setName('');
        setTitle('');
        setQuote('');
        setRating(0);
    };

    return (
        <div className="max-w-2xl mx-auto bg-dark-card p-8 rounded-xl border border-gray-700/50 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Leave Your Review</h3>
            <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-medium-text mb-2">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-dark-bg border border-gray-600 rounded-lg px-4 py-2 text-light-text focus:outline-none focus:ring-2 focus:ring-brand-purple transition-colors"
                            placeholder="e.g. Jane Doe"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-medium-text mb-2">Your Title / Company</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-dark-bg border border-gray-600 rounded-lg px-4 py-2 text-light-text focus:outline-none focus:ring-2 focus:ring-brand-purple transition-colors"
                            placeholder="e.g. CEO, Example Inc."
                            required
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="quote" className="block text-sm font-medium text-medium-text mb-2">Your Review</label>
                    <textarea
                        id="quote"
                        rows={4}
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        className="w-full bg-dark-bg border border-gray-600 rounded-lg px-4 py-2 text-light-text focus:outline-none focus:ring-2 focus:ring-brand-purple transition-colors resize-none"
                        placeholder="Share your experience with us..."
                        required
                    ></textarea>
                </div>
                <div className="mb-6">
                     <label className="block text-sm font-medium text-medium-text mb-2 text-center">Your Rating</label>
                     <div className="flex justify-center items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                type="button"
                                key={star}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="focus:outline-none transform transition-transform duration-150 hover:scale-125"
                                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                            >
                                <StarIcon 
                                    className="h-8 w-8"
                                    filled={star <= (hoverRating || rating)}
                                />
                            </button>
                        ))}
                    </div>
                </div>
                 {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-brand-purple text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-brand-purple-light transition-all duration-300 transform hover:scale-105"
                    >
                        Submit Review
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
