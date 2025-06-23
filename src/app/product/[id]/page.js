import Image from "next/image";
import ProductDetailClient from "../../../components/ProductDetailClient";

// 1) Función para obtener todos los IDs
export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
    { next: { revalidate: 60 } }
  );
  const products = await res.json();

  return products.map((p) => ({ id: p.id }));
}

// 2) Obtener un producto por ID
async function fetchProductById(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  return res.json();
}

// 3) Server Component
export default async function ProductPage({ params }) {
  const { id } = await params; // 👈 Next.js 15
  const product = await fetchProductById(id);

  if (!product) {
    return <h1 className="text-2xl">Servicio no encontrado.</h1>;
  }

  return <ProductDetailServer product={product} />;
}

// 4) Server-rendered product display
function ProductDetailServer({ product }) {
  return (
    <article className="max-w-2xl mx-auto space-y-6">
      <Image
        src={product.image}
        alt={product.name}
        width={600}
        height={400}
        className="rounded object-cover"
      />
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-gray-700">{product.description}</p>

        <p className="text-blue-500 text-2xl font-semibold">
          S/ {product.price}
        </p>

        {/* 👇 Mostrar el stock disponible */}
        <p className="text-sm text-gray-500">
          Stock disponible: {product.stock ?? 'No especificado'}
        </p>

        <ProductDetailClient product={product} />
      </div>
    </article>
  );
}