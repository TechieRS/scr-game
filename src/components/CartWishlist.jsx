import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow, TiTrash, TiHeart, TiShoppingCart } from "react-icons/ti";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { BentoTilt } from "./Features";
import { useGame } from '../context/GameContext';

gsap.registerPlugin(ScrollTrigger);

// Cart Item Component (same as before)
const CartItem = ({ item, onRemove, onMoveToWishlist }) => {
  // ...existing code from Cart.jsx CartItem component...
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="border-hsla bg-black backdrop-blur-sm rounded-xl p-3 md:p-6 mb-4 md:mb-6 transition-all duration-300 hover:bg-black/90">
      <div className="flex gap-3 md:gap-6">
        <div className="w-20 h-16 sm:w-24 sm:h-18 md:w-32 md:h-20 lg:w-40 lg:h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div className="min-w-0 flex-1 mr-2">
                <span className="text-xs font-nippo-light uppercase text-yellow-300 bg-black px-2 py-1 rounded-full">
                  {item.type || item.genre}
                </span>
                <h3 className="font-zentry font-black text-lg sm:text-xl md:text-2xl text-white mt-2 special-font truncate">
                  {item.title}
                </h3>
              </div>
              
              {item.discount && (
                <div className="text-right flex-shrink-0">
                  <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-bold">
                    -{item.discount}%
                  </span>
                </div>
              )}
            </div>

            {item.rewards && (
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400 text-sm">⭐</span>
                <span className="text-xs md:text-sm text-yellow-300 font-nippo-light">
                  {item.rewards}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center">
              <div className="text-left">
                {item.originalPrice && (
                  <span className="text-gray-400 line-through text-xs md:text-sm mr-2">
                    ₹{item.originalPrice}
                  </span>
                )}
                <span className="text-white font-bold text-base md:text-lg">
                  ₹{item.currentPrice || item.price}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={() => onMoveToWishlist(item.id)}
                className="flex items-center gap-1 text-yellow-300 hover:text-yellow-200 transition-colors duration-200 text-xs md:text-sm font-nippo-light uppercase"
              >
                <TiHeart className="text-sm md:text-base" />
                <span className="hidden sm:inline">Move to wishlist</span>
                <span className="sm:hidden">Wishlist</span>
              </button>
              <button
                onClick={() => onRemove(item.id)}
                className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors duration-200 text-xs md:text-sm font-nippo-light uppercase"
              >
                <TiTrash className="text-sm md:text-base" />
                <span className="hidden sm:inline">Remove</span>
                <span className="sm:hidden">Del</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wishlist Item Component (same as before)
const WishlistItem = ({ item, onRemove, onMoveToCart }) => {
  // ...existing code from Wishlist.jsx WishlistItem component...
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <BentoTilt className="border-hsla bg-black backdrop-blur-sm rounded-xl p-3 md:p-6 mb-4 md:mb-6 transition-all duration-300 hover:bg-black/90">
      <div className="flex gap-3 md:gap-6">
        <div className="w-20 h-16 sm:w-24 sm:h-18 md:w-32 md:h-20 lg:w-40 lg:h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div className="min-w-0 flex-1 mr-2">
                <span className="text-xs font-nippo-light uppercase text-blue-300 bg-black px-2 py-1 rounded-full">
                  {item.genre}
                </span>
                <h3 className="font-zentry font-black text-lg sm:text-xl md:text-2xl text-white mt-2 special-font truncate">
                  {item.title}
                </h3>
              </div>
              
              {item.rating && (
                <div className="text-right flex-shrink-0">
                  <span className="text-yellow-300 text-xs md:text-sm">⭐ {item.rating}</span>
                </div>
              )}
            </div>

            {item.price && (
              <div className="mb-2 md:mb-3">
                <span className="text-yellow-300 font-bold text-base md:text-lg">₹{item.price}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-gray-400 text-xs md:text-sm font-nippo-light">
              Added to wishlist
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              {item.price && (
                <button
                  onClick={() => onMoveToCart(item.id)}
                  className="flex items-center gap-1 text-yellow-300 hover:text-yellow-200 transition-colors duration-200 text-xs md:text-sm font-nippo-light uppercase"
                >
                  <TiShoppingCart className="text-sm md:text-base" />
                  <span className="hidden sm:inline">Add to Cart</span>
                  <span className="sm:hidden">Cart</span>
                </button>
              )}
              <button
                onClick={() => onRemove(item.id)}
                className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors duration-200 text-xs md:text-sm font-nippo-light uppercase"
              >
                <TiTrash className="text-sm md:text-base" />
                <span className="hidden sm:inline">Remove</span>
                <span className="sm:hidden">Del</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </BentoTilt>
  );
};

// Order Summary Component (same as before)
const OrderSummary = ({ items, onCheckout }) => {
  // ...existing code from Cart.jsx OrderSummary component...
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const hoverButtonRef = useRef(null);

  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.currentPrice || item.price), 0);
  const discount = items.reduce((sum, item) => {
    if (item.originalPrice && (item.currentPrice || item.price)) {
      return sum + (parseFloat(item.originalPrice) - parseFloat(item.currentPrice || item.price));
    }
    return sum;
  }, 0);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <BentoTilt className="border-hsla bg-black backdrop-blur-sm rounded-xl p-4 md:p-6 sticky top-24">
      <h2 className="font-zentry font-black text-xl md:text-2xl text-white mb-4 md:mb-6 special-font">
        Games and Apps <b>Summary</b>
      </h2>

      <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
        <div className="flex justify-between text-white">
          <span className="font-nippo-light text-sm md:text-base">Price</span>
          <span className="font-nippo-light text-sm md:text-base">₹{(subtotal + discount).toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-400">
            <span className="font-nippo-light text-sm md:text-base">Sale Discount</span>
            <span className="font-nippo-light text-sm md:text-base">-₹{discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-white">
          <span className="font-nippo-light text-sm md:text-base">Taxes</span>
          <span className="font-nippo-light text-xs md:text-sm">Calculated at Checkout</span>
        </div>
        
        <hr className="border-gray-600" />
        
        <div className="flex justify-between text-white font-bold text-base md:text-lg">
          <span className="font-zentry">Subtotal</span>
          <span className="font-zentry">₹{subtotal.toFixed(2)}</span>
        </div>
      </div>

      <div
        ref={hoverButtonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onCheckout}
        className="relative w-full cursor-pointer overflow-hidden rounded-full bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 py-3 md:py-4 px-4 md:px-6 text-center"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
          style={{
            opacity: hoverOpacity,
            background: `radial-gradient(200px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #8ec62cff, #065706ff)`,
          }}
        />
        <span className="relative z-20 font-nippo-light text-white font-bold uppercase text-base md:text-lg">
          Check Out
        </span>
      </div>
    </BentoTilt>
  );
};

// Main Combined Component
const CartWishlist = () => {
  const [activeTab, setActiveTab] = useState('cart');
  const { cartItems, wishlistItems, removeFromCart, removeFromWishlist, moveToWishlistFromCart, moveToCartFromWishlist } = useGame();

  const handleCheckout = () => {
    console.log("Proceeding to checkout with items:", cartItems);
    alert("Proceeding to checkout...");
  };

  const scrollToGamesGallery = () => {
    const gamesSection = document.getElementById('games-gallery');
    if (gamesSection) {
      gamesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // GSAP Animations
  useGSAP(() => {
    gsap.from(".cart-wishlist-title", {
      scrollTrigger: {
        trigger: ".cart-wishlist-title",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(".cart-wishlist-item", {
      scrollTrigger: {
        trigger: ".cart-wishlist-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
    });
  });

  return (
    <section id="cart-wishlist" className="bg-yellow-75 py-20 md:py-32 min-h-screen">
      <div className="container mx-auto px-5 md:px-10">
        {/* Header with Navigation */}
        <div className="cart-wishlist-title mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="relative flex bg-white/10 backdrop-blur-sm rounded-full p-1 border border-black/20">
              {/* Sliding background indicator */}
              <div 
                className={`absolute top-1 bottom-1 bg-black rounded-full shadow-lg transition-all duration-300 ease-out ${
                  activeTab === 'cart' ? 'left-1 right-1/2' : 'left-1/2 right-1'
                }`}
              />
              
              <button
                onClick={() => setActiveTab('cart')}
                className={`relative px-6 py-3 rounded-full font-nippo-light text-sm uppercase font-bold transition-all duration-300 z-10 ${
                  activeTab === 'cart' 
                    ? 'text-white' 
                    : 'text-black hover:text-black/80'
                }`}
              >
                CART ({cartItems.length})
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`relative px-6 py-3 rounded-full font-nippo-light text-sm uppercase font-bold transition-all duration-300 z-10 ${
                  activeTab === 'wishlist' 
                    ? 'text-white' 
                    : 'text-black hover:text-black/80'
                }`}
              >
                WISHLIST ({wishlistItems.length})
              </button>
            </div>
          </div>
          
          <AnimatedTitle
            title={activeTab === 'cart' ? "<b>M</b>y <b>Cart</b>" : "<b>M</b>y Wi<b>s</b>hlist"}
            containerClass="!text-black text-center"
          />
        </div>

        {/* Content based on active tab */}
        <div className="cart-wishlist-section">
          {activeTab === 'cart' ? (
            // Cart Content
            cartItems.length === 0 ? (
              <BentoTilt className="border-hsla bento-tilt_2 bg-black backdrop-blur-sm rounded-xl p-12 text-center">
                <h3 className="font-zentry font-black text-3xl text-white mb-4 special-font">
                  Your cart is <b>empty</b>
                </h3>
                <p className="font-nippo-light text-gray-400 mb-8">
                  Browse our games collection and add some awesome titles to your cart!
                </p>
                <button
                  onClick={scrollToGamesGallery}
                  className="bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-3 rounded-full font-bold uppercase transition-all duration-300 flex items-center gap-2"
                >
                  <TiLocationArrow />
                  Browse Games
                </button>
              </BentoTilt>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="lg:col-span-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-wishlist-item">
                      <CartItem
                        item={item}
                        onRemove={removeFromCart}
                        onMoveToWishlist={moveToWishlistFromCart}
                      />
                    </div>
                  ))}
                </div>
                <div className="border-hsla bento-tilt_1 lg:col-span-1 ">
                  <OrderSummary items={cartItems} onCheckout={handleCheckout} />
                </div>
              </div>
            )
          ) : (
            // Wishlist Content
            wishlistItems.length === 0 ? (
              <BentoTilt className="border-hsla bento-tilt_2 bg-black backdrop-blur-sm rounded-xl p-12 text-center">
                <h3 className="font-zentry font-black text-3xl text-white mb-4 special-font">
                  Your wishlist is <b>empty</b>
                </h3>
                <p className="font-nippo-light text-gray-400 mb-8">
                  Browse our games collection and add some titles you'd like to play later!
                </p>
                <button
                  onClick={scrollToGamesGallery}
                  className="bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-3 rounded-full font-bold uppercase transition-all duration-300 flex items-center gap-2"
                >
                  <TiLocationArrow />
                  Browse Games
                </button>
              </BentoTilt>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="cart-wishlist-item">
                    <WishlistItem
                      item={item}
                      onRemove={removeFromWishlist}
                      onMoveToCart={moveToCartFromWishlist}
                    />
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default CartWishlist;
