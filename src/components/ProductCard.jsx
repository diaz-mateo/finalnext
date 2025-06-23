// src/components/ProductCard.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import Button from "./Button";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition flex flex-col">
<div className="w-full h-48 relative mb-4">
  <Image
    src={product.image}
    alt={product.name}
    fill
    className="rounded object-cover"
    sizes="(max-width: 768px) 100vw, 33vw"
  />
</div>
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="text-gray-600 flex-grow">
        {product.description ?? "Sin descripción disponible."}
      </p>
      <p className="text-blue-500 font-bold my-2">S/ {product.price}</p>
      <div className="flex space-x-2">
        <Link href={`/product/${product.id}`}>
          <Button>Ver detalle</Button>
        </Link>
        <Button onClick={() => addItem({ ...product, quantity: 1 })}>
          + Carrito
        </Button>
      </div>
    </div>
  );
}