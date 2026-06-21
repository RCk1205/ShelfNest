"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext<any>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const stored =
      localStorage.getItem("cart");

    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  function addToCart(book: any) {
    const existing =
      cart.find(
        (item) => item.id === book.id
      );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === book.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        )
      );
      return;
    }

    setCart([
      ...cart,
      {
        ...book,
        quantity: 1,
      },
    ]);
  }

  function removeFromCart(
    id: string
  ) {
    setCart(
      cart.filter(
        (item) => item.id !== id
      )
    );
  }
function increaseQuantity(id: string) {
  setCart(
    cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    )
  );
}

function decreaseQuantity(id: string) {
  setCart(
    cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter(
        (item) => item.quantity > 0
      )
  );
}
function clearCart() {
  setCart([]);
}
  return (
    <CartContext.Provider
      value={{
  cart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
}}

    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
