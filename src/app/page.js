// src/app/page.js
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Nuestros Servicios Incluyen:</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}