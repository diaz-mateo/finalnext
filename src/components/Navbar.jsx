// src/components/Navbar.jsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">Harmony</Link>
      <div className="space-x-4">
        <Link href="/">Inicio</Link>
        <Link href="/cart">Carrito</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </nav>
  );
}