import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<any[]>([]);

    const addToCart = (item: any) => {
        setCartItems(prevItems => [...prevItems, item]);
    };

    const removeFromCart = (productName: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.name !== productName));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};