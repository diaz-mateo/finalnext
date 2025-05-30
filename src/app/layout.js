// src/app/layout.js
import '../app/globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Harmony Psicoterapia',
  description: 'Terapias que sanan.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-sans bg-gray-50 text-gray-800 min-h-screen">
        <Navbar />
        <main className="p-6 max-w-7xl mx-auto">{children}</main>
      </body>
    </html>
  );
}