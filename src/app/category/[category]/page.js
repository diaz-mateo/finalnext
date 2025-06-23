import ProductCard from "../../../components/ProductCard";

// 🔧 Convierte "Terapias Complementarias" → "terapias-complementarias"
function slugifyCategory(category) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

// 🔧 Convierte "terapias-complementarias" → "Terapias Complementarias"
function unslugifyCategory(slug) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// 1) Generar rutas estáticas para cada categoría existente
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    next: { revalidate: 60 },
  });
  const products = await res.json();

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  return categories.map((category) => ({
    category: slugifyCategory(category),
  }));
}

// 2) Obtener productos de la categoría usando slug
async function fetchProductsByCategory(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    next: { revalidate: 60 },
  });
  const allProducts = await res.json();

  return allProducts.filter((p) => {
    const catSlug = p.category?.toLowerCase().replace(/\s+/g, "-");
    return catSlug === slug.toLowerCase();
  });
}

// 3) Metadata dinámica para SEO
export async function generateMetadata(props) {
  const { category } = props.params;
  const categoryName = unslugifyCategory(category);
  return {
    title: `Servicios de ${categoryName} – Clínica Harmony`,
    description: `Explora nuestros servicios de ${categoryName} en Clínica Harmony.`,
    alternates: {
      canonical: `/category/${category}`,
    },
  };
}

// 4) Componente principal
export default async function CategoryPage(props) {
  const { category } = props.params;
  const products = await fetchProductsByCategory(category);

  if (!products.length) {
    return (
      <section className="max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-600">
          Categoría no encontrada.
        </h1>
      </section>
    );
  }

  const pretty = unslugifyCategory(category);

  return (
    <section className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{pretty}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}