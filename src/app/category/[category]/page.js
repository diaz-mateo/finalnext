// src/app/category/[category]/page.js
import ProductCard from "../../../components/ProductCard";

// 1) Generar static params para cada categoría existente
export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
    { next: { revalidate: 60 } }
  );
  const products = await res.json();
  // obtenemos set de categorías únicas
  const categories = [...new Set(products.map((p) => p.category))];
  return categories.map((cat) => ({ category: cat }));
}

// 2) Función para obtener solo los productos de una categoría
async function fetchProductsByCategory(cat) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
    { next: { revalidate: 60 } }
  );
  const allProducts = await res.json();
  return allProducts.filter((p) => p.category === cat);
}

export default async function CategoryPage({ params }) {
  const { category } = params;
  const products = await fetchProductsByCategory(category);

  if (!products.length) {
    return <h1 className="text-2xl">Categoría no encontrada.</h1>;
  }

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">
        Categoría: {category}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}