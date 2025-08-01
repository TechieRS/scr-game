import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Navbar from './components/Navbar';
import Features from './components/Features';
import GamesGallery from './components/GamesGallery';
import Story from './components/Story';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorTrail from "./components/CursorTrail/CursorTrail";
import CartWishlist from './components/CartWishlist';
import { GameProvider } from './context/GameContext';
import { Toaster } from 'sonner'; // 1. Import the Toaster component

const App = () => {
  return (
    <GameProvider>
      {/* 2. Add the Toaster here. It will manage and display all notifications. */}
      {/* We use `richColors` for nice default styling and `top-right` for position. */}
      <Toaster richColors position="top-right" />

      <main className='relative min-h-screen w-screen overflow-x-hidden'>
        <CursorTrail />
        <Hero/>
        <Navbar/>
        <About/>
        <Features/>
        <GamesGallery/>
        <Story/>
        <div className="mb-32">
          <CartWishlist/>
        </div>
        <Contact/>
        <Footer/>
      </main>
    </GameProvider>
  );
};

export default App;