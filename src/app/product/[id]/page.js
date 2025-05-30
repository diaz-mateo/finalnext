// src/app/product/[id]/page.js
'use client';

import { useState } from 'react';
import { products } from '../../../data/products';
import Image from 'next/image';
import QuantitySelector from '../../../components/QuantitySelector';
import Button from '../../../components/Button';

export default function ProductPage({ params }) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    return <h1 className="text-2xl">Servicio no encontrado.</h1>;
  }

  const [selectedQty, setSelectedQty] = useState(1);

  const handleAdd = () => {
    // Aquí podrías conectar con tu lógica de carrito
    alert(`Añadido ${selectedQty} unidad(es) de ${product.name} al carrito`);
  };

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

        <div className="flex items-center space-x-4">
          <QuantitySelector onChange={setSelectedQty} />
          <Button onClick={handleAdd}>
            Añadir al carrito
          </Button>
        </div>
      </div>
    </article>
  );
}