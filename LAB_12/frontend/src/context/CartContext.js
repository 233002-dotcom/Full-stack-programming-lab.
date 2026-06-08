'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('rustik_cart');
      if (stored) setCart(JSON.parse(stored));
    } catch {}
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('rustik_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === product._id);
      if (existing) {
        return prev.map((i) =>
          i._id === product._id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart((prev) => prev.map((i) => (i._id === id ? { ...i, quantity: qty } : i)));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
