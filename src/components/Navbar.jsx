'use client';

import Link from "next/link";
import { useCart } from "../context/CartContext";

// ✅ Slugifica categoría para URL
function slugifyCategory(category) {
  return category
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .replace(/\s+/g, "-");
}

export default function Navbar() {
  const { items } = useCart();
  const totalQty = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        Clínica Harmony
      </Link>

      <div className="space-x-4 flex items-center text-gray-800">
        <Link href="/" className="hover:text-blue-600 font-medium">
          Inicio
        </Link>

        {/* ENLACES A CATEGORÍAS USANDO SLUGIFY */}
        <Link href={`/category/${slugifyCategory("Psicoterapia")}`} className="hover:text-blue-600 font-medium">
          Psicoterapia
        </Link>
        <Link href={`/category/${slugifyCategory("Psicología")}`} className="hover:text-blue-600 font-medium">
          Psicología
        </Link>
        <Link href={`/category/${slugifyCategory("Parejas")}`} className="hover:text-blue-600 font-medium">
          Parejas
        </Link>
        <Link href={`/category/${slugifyCategory("Hipnosis")}`} className="hover:text-blue-600 font-medium">
          Hipnosis
        </Link>
        <Link href={`/category/${slugifyCategory("Terapias Complementarias")}`} className="hover:text-blue-600 font-medium">
          Terapias Complementarias
        </Link>

        <Link href="/cart" className="relative hover:text-blue-600 font-medium">
          Carrito
          {totalQty > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalQty}
            </span>
          )}
        </Link>

        <Link href="/admin" className="hover:text-blue-600 font-medium">
          Admin
        </Link>

        <Link href="/about" className="hover:text-blue-600 font-medium">
  Sobre Nosotros
</Link>

      </div>
    </nav>
  );
}