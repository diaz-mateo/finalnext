'use client';

import { useState } from 'react';
import Button from '../../components/Button';

export default function AdminPage() {
  const [serviceName, setServiceName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!serviceName.trim()) return;
    alert(`Nuevo servicio añadido: ${serviceName}`);
    setServiceName('');
  };

  return (
    <section className="max-w-lg mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="block mb-1 font-medium">Nombre del servicio</span>
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            placeholder="Ej. Aromaterapia"
          />
        </label>
        <Button type="submit">Añadir servicio</Button>
      </form>
    </section>
  );
}