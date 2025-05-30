// src/components/QuantitySelector.jsx
'use client';

import { useState, useEffect } from 'react';
import Button from './Button';

export default function QuantitySelector({ onChange }) {
  const [qty, setQty] = useState(1);

  // Notifica el valor inicial al montar
  useEffect(() => {
    onChange(qty);
  }, []);

  const inc = () => {
    setQty(prev => {
      const next = prev + 1;
      onChange(next);
      return next;
    });
  };

  const dec = () => {
    setQty(prev => {
      const next = Math.max(1, prev - 1);
      onChange(next);
      return next;
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Button onClick={dec}>–</Button>
      <span className="px-3">{qty}</span>
      <Button onClick={inc}>+</Button>
    </div>
  );
}