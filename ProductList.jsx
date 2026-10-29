import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from './CartSlice';

const plants = [
  { id: 1, name: 'Snake Plant', category: 'Air-Purifying Plants', price: 299, image: 'photo-1501004318641-b39e6451bec6', description: 'A hardy, low-maintenance plant for your home.' },
  { id: 2, name: 'Peace Lily', category: 'Air-Purifying Plants', price: 399, image: 'photo-1497250681960-ef046c08a56e', description: 'Elegant green foliage with beautiful white blooms.' },
  { id: 3, name: 'Areca Palm', category: 'Air-Purifying Plants', price: 549, image: 'photo-1485955900006-10f4d324d411', description: 'A tropical palm that brightens indoor spaces.' },
  { id: 4, name: 'Spider Plant', category: 'Air-Purifying Plants', price: 249, image: 'photo-1459156212016-c812468e2115', description: 'A forgiving plant with arching green leaves.' },
  { id: 5, name: 'Rubber Plant', category: 'Air-Purifying Plants', price: 449, image: 'photo-1509423350716-97f9360b4e09', description: 'Glossy leaves add a bold, modern touch.' },
  { id: 6, name: 'Golden Pothos', category: 'Air-Purifying Plants', price: 199, image: 'photo-1494438639946-1ebd1d20bf85', description: 'A trailing plant that looks lovely on shelves.' },

  { id: 7, name: 'Echeveria', category: 'Succulents & Cacti', price: 149, image: 'photo-1459411552884-841db9b3cc2a', description: 'A compact rosette succulent for sunny spaces.' },
  { id: 8, name: 'Aloe Vera', category: 'Succulents & Cacti', price: 179, image: 'photo-1509423350716-97f9360b4e09', description: 'A useful succulent with fleshy green leaves.' },
  { id: 9, name: 'Jade Plant', category: 'Succulents & Cacti', price: 229, image: 'photo-1485955900006-10f4d324d411', description: 'A charming succulent with thick oval leaves.' },
  { id: 10, name: 'Moon Cactus', category: 'Succulents & Cacti', price: 199, image: 'photo-1509937528035-ad76254b0356', description: 'A colourful cactus for a sunny windowsill.' },
  { id: 11, name: 'Haworthia', category: 'Succulents & Cacti', price: 169, image: 'photo-1459411552884-841db9b3cc2a', description: 'A small, sculptural succulent for desks.' },
  { id: 12, name: 'String of Pearls', category: 'Succulents & Cacti', price: 349, image: 'photo-1497250681960-ef046c08a56e', description: 'Trailing bead-like leaves create a distinctive look.' },

  { id: 13, name: 'Anthurium', category: 'Flowering Plants', price: 499, image: 'photo-1490750967868-88aa4486c946', description: 'Glossy leaves and striking colourful flowers.' },
  { id: 14, name: 'African Violet', category: 'Flowering Plants', price: 279, image: 'photo-1468327768560-75b778cbb551', description: 'A compact flowering plant for bright rooms.' },
  { id: 15, name: 'Kalanchoe', category: 'Flowering Plants', price: 249, image: 'photo-1494972308805-463bc619d34e', description: 'Cheerful clusters of flowers with fleshy leaves.' },
  { id: 16, name: 'Orchid', category: 'Flowering Plants', price: 699, image: 'photo-1508610048659-a06b669e3321', description: 'Elegant blooms for a sophisticated display.' },
  { id: 17, name: 'Jasmine', category: 'Flowering Plants', price: 329, image: 'photo-1490750967868-88aa4486c946', description: 'A delicate flowering plant with fragrant blooms.' },
  { id: 18, name: 'Bromeliad', category: 'Flowering Plants', price: 599, image: 'photo-1485955900006-10f4d324d411', description: 'Tropical foliage with a bold, colourful centre.' }
];

const imageUrl = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`;

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const categories = [...new Set(plants.map(plant => plant.category))];

  return (
    <main className="page-container">
      <section className="section-heading">
        <span className="eyebrow">GROW SOMETHING BEAUTIFUL</span>
        <h1>Our Plant Collection</h1>
        <p>Find the perfect green companion for every corner of your home.</p>
      </section>

      {categories.map(category => (
        <section className="plant-category" key={category}>
          <h2>{category}</h2>
          <div className="plant-grid">
            {plants.filter(plant => plant.category === category).map(plant => {
              const added = cartItems.some(item => item.id === plant.id);
              return (
                <article className="plant-card" key={plant.id}>
                  <img src={imageUrl(plant.image)} alt={plant.name} loading="lazy" />
                  <div className="plant-card-content">
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <div className="plant-card-footer">
                      <strong>₹{plant.price}</strong>
                      <button
                        className="button button-small"
                        disabled={added}
                        onClick={() => dispatch(addToCart(plant))}
                      >
                        {added ? 'Added ✓' : 'Add to Cart'}
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
  );
}
