// src/app/page.js
import ProductCard from "../components/ProductCard";

// Función para hacer fetch a nuestra API en Firebase usando URL absoluta
async function fetchProducts() {
  // Construimos la URL absoluta con la variable de entorno
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  const url = new URL("/api/products", base).toString();

  const res = await fetch(url, {
    next: { revalidate: 60 } // ISR: revalida cada 60 s
  });
  if (!res.ok) throw new Error("Error al cargar productos");
  return res.json();
}

export default async function Home() {
  const products = await fetchProducts();

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Nuestros Servicios</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}