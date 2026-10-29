
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeItem,
  updateQuantity
} from './CartSlice';
import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  Leaf
} from 'lucide-react';

export default function CartItem({ onContinueShopping = () => {} }) {
  const dispatch = useDispatch();

  const items = useSelector(
    (state) => state.cart.items
  );

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  function handleIncrement(item) {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1
      })
    );
  }

  function handleDecrement(item) {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1
        })
      );
    }
  }

  function handleDelete(item) {
    dispatch(removeItem(item.id));
  }

  function handleCheckout() {
    window.alert('Coming Soon!');
  }

  if (items.length === 0) {
    return (
      <main className="page-container">
        <section className="empty-cart">
          <div className="empty-cart-icon">
            <Leaf size={42} />
          </div>

          <h1>Your cart is empty</h1>

          <p>
            Add a few plants to bring your space to life.
          </p>

          <button
            className="button"
            onClick={onContinueShopping}
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page-container">
      <section className="section-heading cart-heading">
        <span className="eyebrow">YOUR SELECTION</span>

        <h1>Shopping Cart</h1>

        <p>
          Review your plants and adjust quantities before checkout.
        </p>
      </section>

      <div className="cart-layout">
        <section className="cart-items">
          {items.map((item) => (
            <article className="cart-row" key={item.id}>
              <img
                className="cart-product-image"
                src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=240&q=80`}
                alt={item.name}
              />

              <div className="cart-product-details">
                <h3>{item.name}</h3>

                <p>₹{item.price} per plant</p>

                <div className="quantity-control">
                  <button
                    aria-label={`Decrease ${item.name} quantity`}
                    disabled={item.quantity <= 1}
                    onClick={() => handleDecrement(item)}
                  >
                    <Minus size={15} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => handleIncrement(item)}
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              <div className="cart-line-total">
                <strong>
                  ₹{item.price * item.quantity}
                </strong>

                <button
                  className="delete-button"
                  onClick={() => handleDelete(item)}
                  aria-label={`Delete ${item.name}`}
                >
                  <Trash2 size={17} />
                  Delete
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-line">
            <span>Unique plants</span>
            <span>{items.length}</span>
          </div>

          <div className="summary-line">
            <span>Total items</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-total">
            <span>Total amount</span>
            <strong>₹{total}</strong>
          </div>

          <button
            className="button checkout-button"
            onClick={handleCheckout}
          >
            Checkout
          </button>

          <button
            className="text-button"
            onClick={onContinueShopping}
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </button>
        </aside>
      </div>
    </main>
  );
}
