// src/app/layout.js
import "./globals.css";
import Navbar from "../components/Navbar";
import { CartProvider } from "../context/CartContext";

/** @type {import('next').Metadata} */
export const metadata = {
  title: "Harmony Psicoterapia",
  description: "Terapias que sanan con Firebase y Next.js",
  alternates: {
    canonical: "https://tu-dominio.vercel.app",
  },
};

/** @type {import('next').Viewport} */
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-sans bg-gray-50 text-gray-800 min-h-screen">
        <CartProvider>
          <Navbar />
          <main className="p-6 max-w-7xl mx-auto">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}