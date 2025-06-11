"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import QuantitySelector from "./QuantitySelector";
import Button from "./Button";

export default function ProductDetailClient({ product }) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({ ...product, quantity: qty });
  };

  return (
    <div className="flex items-center space-x-4 mt-4">
      <QuantitySelector onChange={setQty} />
      <Button onClick={handleAdd}>Añadir al carrito</Button>
    </div>
  );
}