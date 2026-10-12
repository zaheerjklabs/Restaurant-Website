import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, MenuItemOption } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, portion?: MenuItemOption, addons?: MenuItemOption[], instructions?: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  discountCode: string;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;
  tax: number;
  deliveryFee: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  orderType: 'delivery' | 'pickup' | 'dinein';
  setOrderType: (type: 'delivery' | 'pickup' | 'dinein') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'maison_lambre_cart_v1';
const PROMO_STORAGE_KEY = 'maison_lambre_promo_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [discountCode, setDiscountCode] = useState<string>(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup' | 'dinein'>('dinein');

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (discountCode) {
        localStorage.setItem(PROMO_STORAGE_KEY, discountCode);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [discountCode]);

  const addToCart = (
    item: MenuItem, 
    portion?: MenuItemOption, 
    addons?: MenuItemOption[], 
    instructions?: string
  ) => {
    const addonsDelta = (addons || []).reduce((acc, a) => acc + a.priceDelta, 0);
    const unitPrice = item.price + (portion?.priceDelta || 0) + addonsDelta;
    
    // Check if matching configuration already exists
    const existingIndex = cart.findIndex(c => 
      c.menuItemId === item.id &&
      c.selectedPortion?.name === portion?.name &&
      JSON.stringify(c.selectedAddons?.map(a => a.name).sort()) === JSON.stringify(addons?.map(a => a.name).sort()) &&
      (c.specialInstructions || '') === (instructions || '')
    );

    if (existingIndex > -1) {
      setCart(prev => {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        next[existingIndex].itemTotal = next[existingIndex].quantity * unitPrice;
        return next;
      });
    } else {
      const newCartItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        menuItemId: item.id,
        item,
        quantity: 1,
        selectedPortion: portion,
        selectedAddons: addons,
        specialInstructions: instructions,
        itemTotal: unitPrice
      };
      setCart(prev => [...prev, newCartItem]);
    }
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === cartItemId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          const unitPrice = item.itemTotal / item.quantity;
          return {
            ...item,
            quantity: newQty,
            itemTotal: newQty * unitPrice
          };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.itemTotal, 0);

  // Discount calculation
  let discountRate = 0;
  if (discountCode.trim().toUpperCase() === 'LAMBRE20') {
    discountRate = 0.20;
  } else if (discountCode.trim().toUpperCase() === 'CHEF10') {
    discountRate = 0.10;
  }
  const discount = subtotal * discountRate;

  const deliveryFee = orderType === 'delivery' && subtotal > 0 ? (subtotal >= 75 ? 0 : 5.00) : 0;
  const tax = (subtotal - discount) > 0 ? (subtotal - discount) * 0.08 : 0; // 8% tax
  const total = Math.max(0, subtotal - discount + tax + deliveryFee);

  const applyDiscountCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'LAMBRE20') {
      setDiscountCode('LAMBRE20');
      return { success: true, message: '20% Welcome Tasting discount applied!' };
    }
    if (clean === 'CHEF10') {
      setDiscountCode('CHEF10');
      return { success: true, message: '10% Chef VIP discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try "LAMBRE20"' };
  };

  const removeDiscountCode = () => {
    setDiscountCode('');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        discount,
        discountCode,
        applyDiscountCode,
        removeDiscountCode,
        tax,
        deliveryFee,
        total,
        isCartOpen,
        setIsCartOpen,
        orderType,
        setOrderType,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
