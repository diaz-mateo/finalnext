import Link from "next/link";
import ProductCard from "../components/ProductCard";

// Slugifica categorías para URL
function slugifyCategory(category) {
  return category
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .replace(/\s+/g, "-");
}

// Capitaliza nombres de categoría bonitos
function formatCategoryName(slug) {
  return slug
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Fetch de productos
async function fetchProducts() {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  const url = new URL("/api/products", base).toString();

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Error al cargar productos");
  return res.json();
}

export default async function Home() {
  const products = await fetchProducts();

  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  );

  return (
    <section className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Nuestros Servicios</h1>

      {/* Enlaces a categorías con slug */}
      <div className="mb-8 flex flex-wrap gap-4">
        {categories.map((cat) => {
          const slug = slugifyCategory(cat);
          return (
            <Link
              key={cat}
              href={`/category/${slug}`}
              className="text-blue-600 underline"
            >
              {formatCategoryName(slug)}
            </Link>
          );
        })}
      </div>

      {/* Catálogo de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}