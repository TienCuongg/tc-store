/**
 * ==============================================================================
 * 🛒 QUẢN LÝ GIỎ HÀNG TOÀN CỤC (CART CONTEXT & STATE)
 * ==============================================================================
 * Quản lý toàn bộ vòng đời sản phẩm trong giỏ:
 * - cart: Mảng chứa { productId, size, quantity }
 * - addToCart(product, size, qty): Thêm giày theo kích cỡ vào giỏ
 * - updateQuantity(productId, size, delta): Tăng/giảm số lượng (+1, -1)
 * - removeFromCart(productId, size): Xóa sản phẩm khỏi giỏ
 * - isCartOpen, openCartDrawer, closeCartDrawer: Đóng mở ngăn kéo giỏ hàng trượt từ phải
 * - Tự động tính: Tạm tính, Phí ship (Free ship khi đơn >= 1.500.000₫), Tổng thanh toán
 * - Lưu tự động vào localStorage('tc_cart_v2') để không bị mất khi F5
 * ==============================================================================
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ALL_PRODUCTS } from '../data/products';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('tc_cart_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [{ productId: 1, size: 41, quantity: 1 }];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('tc_cart_v2', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product, size = 41, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.size === Number(size)
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { productId: product.id, size: Number(size), quantity }];
    });
    showToast(`Đã thêm "${product.name}" (Size ${size}) vào giỏ hàng!`, 'success');
  };

  const updateQuantity = (productId, size, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.productId === productId && item.size === Number(size)) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId, size) => {
    setCart((prev) => prev.filter((item) => !(item.productId === productId && item.size === Number(size))));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Detailed items with populated product info
  const cartItems = cart.map((item) => {
    const product = ALL_PRODUCTS.find((p) => p.id === item.productId) || {
      name: 'Giày thể thao chính hãng',
      price: 2000000,
      image: 'assets/images/hero-sneaker.jpg'
    };
    return {
      ...item,
      product,
      subtotal: product.price * item.quantity
    };
  });

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const shipping = subtotal > 1500000 || subtotal === 0 ? 0 : 30000;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        totalCount,
        subtotal,
        shipping,
        total,
        isCartOpen,
        openCartDrawer: () => setIsCartOpen(true),
        closeCartDrawer: () => setIsCartOpen(false),
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
