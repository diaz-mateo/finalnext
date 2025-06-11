'use client';

import { useState, useEffect } from 'react';
import Button from './Button';

export default function QuantitySelector({ onChange }) {
  const [qty, setQty] = useState(1);

  // Notifica el cambio de cantidad, incluso al inicio
  useEffect(() => {
    onChange(qty);
  }, [qty]); // ← ahora depende de qty

  const inc = () => setQty(prev => prev + 1);
  const dec = () => setQty(prev => Math.max(1, prev - 1));

  return (
    <div className="flex items-center space-x-2">
      <Button onClick={dec}>–</Button>
      <span className="px-3">{qty}</span>
      <Button onClick={inc}>+</Button>
    </div>
  );
}