import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Shoe } from '@/data/shoes';

export interface CartItem {
  id: string; // Unique ID for the cart item (shoe.id + size)
  shoe: Shoe;
  size: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  checkoutShoe: { shoe: Shoe; size: number; quantity: number } | null;
  setCheckoutShoe: (data: { shoe: Shoe; size: number; quantity: number } | null) => void;
  addToCart: (shoe: Shoe, size: number, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
  discount: number;
  applyDiscount: (amount: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutShoe, setCheckoutShoe] = useState<{ shoe: Shoe; size: number; quantity: number } | null>(null);
  const [discount, setDiscount] = useState<number>(() => {
    const savedDiscount = localStorage.getItem('cartDiscount');
    return savedDiscount ? Number(savedDiscount) : 0;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('cartDiscount', discount.toString());
  }, [discount]);

  const applyDiscount = (amount: number) => {
    setDiscount(amount);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openCheckout = () => setIsCheckoutOpen(true);
  const closeCheckout = () => { setIsCheckoutOpen(false); setCheckoutShoe(null); };

  const addToCart = (shoe: Shoe, size: number, quantity = 1) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.shoe.id === shoe.id && item.size === size
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }

      return [...prevItems, { id: `${shoe.id}-${size}`, shoe, size, quantity }];
    });
    openCart();
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const cartTotal = items.reduce((total, item) => total + item.shoe.price * item.quantity, 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart,
        closeCart,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        checkoutShoe,
        setCheckoutShoe,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        discount,
        applyDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
