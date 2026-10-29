
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Leaf,
  House,
  Sprout,
  ShoppingCart
} from 'lucide-react';
import { addItem } from './CartSlice';

const plantsArray = [
  {
    category: 'Air-Purifying Plants',
    plants: [
      { id: 1, name: 'Snake Plant', price: 299, image: 'photo-1501004318641-b39e6451bec6', description: 'A hardy, low-maintenance plant for your home.' },
      { id: 2, name: 'Peace Lily', price: 399, image: 'photo-1497250681960-ef046c08a56e', description: 'Elegant green foliage with beautiful white blooms.' },
      { id: 3, name: 'Areca Palm', price: 549, image: 'photo-1485955900006-10f4d324d411', description: 'A tropical palm that brightens indoor spaces.' },
      { id: 4, name: 'Spider Plant', price: 249, image: 'photo-1459156212016-c812468e2115', description: 'A forgiving plant with arching green leaves.' },
      { id: 5, name: 'Rubber Plant', price: 449, image: 'photo-1509423350716-97f9360b4e09', description: 'Glossy leaves add a bold, modern touch.' },
      { id: 6, name: 'Golden Pothos', price: 199, image: 'photo-1494438639946-1ebd1d20bf85', description: 'A trailing plant that looks lovely on shelves.' }
    ]
  },
  {
    category: 'Succulents & Cacti',
    plants: [
      { id: 7, name: 'Echeveria', price: 149, image: 'photo-1459411552884-841db9b3cc2a', description: 'A compact rosette succulent for sunny spaces.' },
      { id: 8, name: 'Aloe Vera', price: 179, image: 'photo-1509423350716-97f9360b4e09', description: 'A useful succulent with fleshy green leaves.' },
      { id: 9, name: 'Jade Plant', price: 229, image: 'photo-1485955900006-10f4d324d411', description: 'A charming succulent with thick oval leaves.' },
      { id: 10, name: 'Moon Cactus', price: 199, image: 'photo-1509937528035-ad76254b0356', description: 'A colourful cactus for a sunny windowsill.' },
      { id: 11, name: 'Haworthia', price: 169, image: 'photo-1459411552884-841db9b3cc2a', description: 'A small, sculptural succulent for desks.' },
      { id: 12, name: 'String of Pearls', price: 349, image: 'photo-1497250681960-ef046c08a56e', description: 'Trailing bead-like leaves create a distinctive look.' }
    ]
  },
  {
    category: 'Flowering Plants',
    plants: [
      { id: 13, name: 'Anthurium', price: 499, image: 'photo-1490750967868-88aa4486c946', description: 'Glossy leaves and striking colourful flowers.' },
      { id: 14, name: 'African Violet', price: 279, image: 'photo-1468327768560-75b778cbb551', description: 'A compact flowering plant for bright rooms.' },
      { id: 15, name: 'Kalanchoe', price: 249, image: 'photo-1494972308805-463bc619d34e', description: 'Cheerful clusters of flowers with fleshy leaves.' },
      { id: 16, name: 'Orchid', price: 699, image: 'photo-1508610048659-a06b669e3321', description: 'Elegant blooms for a sophisticated display.' },
      { id: 17, name: 'Jasmine', price: 329, image: 'photo-1490750967868-88aa4486c946', description: 'A delicate flowering plant with fragrant blooms.' },
      { id: 18, name: 'Bromeliad', price: 599, image: 'photo-1485955900006-10f4d324d411', description: 'Tropical foliage with a bold, colourful centre.' }
    ]
  }
];

const imageUrl = (image) =>
  `https://images.unsplash.com/${image}?auto=format&fit=crop&w=700&q=80`;

export default function ProductList({ onNavigate = () => {} }) {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const [addedToCart, setAddedToCart] = useState({});

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function handleAddToCart(plant) {
    dispatch(addItem(plant));

    setAddedToCart((previous) => ({
      ...previous,
      [plant.name]: true
    }));
  }

  return (
    <div className="product-page">
      <nav className="navbar" aria-label="Main navigation">
        <button
          className="brand"
          onClick={() => onNavigate('home')}
          aria-label="Paradise Nursery home"
        >
          <span className="brand-icon">
            <Leaf size={23} />
          </span>
          <span>
            Paradise <strong>Nursery</strong>
          </span>
        </button>

        <div className="nav-links">
          <button
            className="nav-link"
            onClick={() => onNavigate('home')}
          >
            <House size={16} />
            Home
          </button>

          <button
            className="nav-link active"
            onClick={() => onNavigate('plants')}
          >
            <Sprout size={16} />
            Plants
          </button>

          <button
            className="nav-link"
            onClick={() => onNavigate('cart')}
          >
            <ShoppingCart size={17} />
            Cart
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </nav>

      <main className="page-container">
        <section className="section-heading">
          <span className="eyebrow">
            GROW SOMETHING BEAUTIFUL
          </span>

          <h1>Our Plant Collection</h1>

          <p>
            Find the perfect green companion for every
            corner of your home.
          </p>
        </section>

        {plantsArray.map((category) => (
          <section
            className="product-list"
            key={category.category}
          >
            <h2>{category.category}</h2>

            <div className="plant-grid">
              {category.plants.map((plant) => {
                const alreadyInCart = cartItems.some(
                  (item) => item.id === plant.id
                );

                const added =
                  addedToCart[plant.name] || alreadyInCart;

                return (
                  <article
                    className="plant-card"
                    key={plant.id}
                  >
                    <img
                      src={imageUrl(plant.image)}
                      alt={plant.name}
                      loading="lazy"
                    />

                    <div className="plant-card-content">
                      <h3>{plant.name}</h3>

                      <p>{plant.description}</p>

                      <div className="plant-card-footer">
                        <strong>₹{plant.price}</strong>

                        <button
                          className="button button-small"
                          disabled={added}
                          onClick={() => handleAddToCart(plant)}
                        >
                          {added
                            ? 'Added to Cart'
                            : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
