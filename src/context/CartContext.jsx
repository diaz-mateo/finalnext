"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../lib/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const CartContext = createContext();

const USER_ID = "user1";
const CART_DOC = doc(db, "carts", USER_ID);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // 🆕 Estado de carga

  // Cargar carrito desde Firestore
  useEffect(() => {
    const loadCart = async () => {
      try {
        const docSnap = await getDoc(CART_DOC);
        if (docSnap.exists()) {
          setItems(docSnap.data().items || []);
        }
      } catch (error) {
        console.error("Error cargando carrito:", error);
      } finally {
        setLoading(false); // ✅ Solo después de intentar cargar
      }
    };

    loadCart();
  }, []);

  // Guardar en Firestore cuando cambia `items`, pero solo si no está cargando
  useEffect(() => {
    if (loading) return;

    const saveCart = async () => {
      try {
        console.log("Guardando carrito:", items); // 👈 útil para debug
        await setDoc(CART_DOC, { items });
      } catch (error) {
        console.error("Error guardando carrito:", error);
      }
    };

    saveCart();
  }, [items, loading]);

  const addItem = (product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + product.quantity }
            : i
        );
      }
      return [...prev, product];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const updateQuantity = (id, newQty) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: newQty } : i
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
}