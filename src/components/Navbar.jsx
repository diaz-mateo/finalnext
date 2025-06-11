// src/components/Navbar.jsx
"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { items } = useCart();
  const totalQty = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        Harmony
      </Link>
      <div className="space-x-4 flex items-center">
        <Link href="/">Inicio</Link>
        <Link href="/cart" className="relative">
          Carrito
          {totalQty > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalQty}
            </span>
          )}
        </Link>
        <Link href="/admin">Admin</Link>
      </div>
    </nav>
  );
}