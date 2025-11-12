
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import UpcomingPage from './components/UpcomingPage';

const App: React.FC = () => {
  const [isUpcomingPageOpen, setIsUpcomingPageOpen] = useState(false);

  return (
    <div className="bg-dark-bg text-light-text font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Reviews />
        <Contact />
      </main>
      <Footer onUpcomingFeatureClick={() => setIsUpcomingPageOpen(true)} />
      <BackToTopButton />
      <UpcomingPage 
        isOpen={isUpcomingPageOpen}
        onClose={() => setIsUpcomingPageOpen(false)}
      />
    </div>
  );
};

export default App;