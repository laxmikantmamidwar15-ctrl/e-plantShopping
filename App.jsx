import { useSelector } from 'react-redux';
import { Leaf, ShoppingBag, House, Sprout } from 'lucide-react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

export default function App() {
  const [page, setPage] = React.useState('home');
  const items = useSelector(state => state.cart.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  function navigate(nextPage) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="app-shell">
      <header className="navbar">
        <button className="brand" onClick={() => navigate('home')} aria-label="Paradise Nursery home">
          <span className="brand-icon"><Leaf size={23} /></span>
          <span>Paradise <strong>Nursery</strong></span>
        </button>
        <nav className="nav-links" aria-label="Main navigation">
          <button className={page === 'home' ? 'nav-link active' : 'nav-link'} onClick={() => navigate('home')}><House size={16} /> Home</button>
          <button className={page === 'plants' ? 'nav-link active' : 'nav-link'} onClick={() => navigate('plants')}><Sprout size={16} /> Plants</button>
          <button className={page === 'cart' ? 'nav-link active' : 'nav-link'} onClick={() => navigate('cart')}><ShoppingBag size={17} /> Cart <span className="cart-count">{cartCount}</span></button>
        </nav>
      </header>

      {page === 'home' && (
        <>
          <main className="hero">
            <div className="hero-content">
              <span className="hero-pill"><Leaf size={15} /> BRING NATURE HOME</span>
              <h1>Make room for<br /><em>something green.</em></h1>
              <p>Discover beautiful plants that bring calm, colour, and fresh energy into your everyday spaces.</p>
              <button className="button hero-button" onClick={() => navigate('plants')}>Get Started <span>→</span></button>
              <div className="hero-note"><span>✿</span> A greener home starts with one plant.</div>
            </div>
            <div className="hero-decoration"><div className="hero-badge"><Leaf size={22} /><span>Grow at your<br />own pace</span></div></div>
          </main>
          <AboutUs />
          <section className="home-cta"><h2>Your next favourite plant is waiting.</h2><button className="button" onClick={() => navigate('plants')}>Explore Plants →</button></section>
        </>
      )}

      {page === 'plants' && <ProductList />}
      {page === 'cart' && <CartItem onContinueShopping={() => navigate('plants')} />}

      <footer className="footer">
        <span><Leaf size={17} /> Paradise Nursery</span>
        <p>Grow gently. Live greener.</p>
        <small>© {new Date().getFullYear()} Paradise Nursery. Created for learning.</small>
      </footer>
    </div>
  );
}

import React from 'react';
