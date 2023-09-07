import { create } from "zustand";
import { persist } from "zustand/middleware";
import CartState from "@/types/CartState";

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isCartOpen: false,
      paymentIntent: "",
      setPaymentIntent: (val) => set({ paymentIntent: val }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      addToCart: (product) =>
        set((state) => {
          const itemsExists = state.cart.find((item) => item.id === product.id);
          if (itemsExists) {
            const updatedCart = state.cart.map((item) => {
              if (item.id === product.id) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            });
            return { cart: updatedCart };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
      removeFromCart: (product) =>
        set((state) => {
          const itemExists = state.cart.find((item) => item.id === product.id);
          if (itemExists && itemExists.quantity > 1) {
            const updatedCart = state.cart.map((item) => {
              if (item.id === product.id) {
                return { ...item, quantity: item.quantity - 1 };
              }
              return item;
            });
            return { cart: updatedCart };
          } else {
            const updatedCart = state.cart.filter(
              (item) => item.id !== product.id
            );
            return { cart: updatedCart };
          }
        }),
      clearProductFromCart: (product) =>
        set((state) => {
          const updatedCart = state.cart.filter(
            (item) => item.id !== product.id
          );
          return { cart: updatedCart };
        }),
    }),

    { name: "cart-storage" }
  )
);
