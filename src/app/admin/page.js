'use client';

import { useState, useEffect } from 'react';
import { db } from '../../lib/firebaseConfig';
import {
  collection,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore';
import Button from '../../components/Button';

export default function AdminPage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const colRef = collection(db, 'products');
      const snapshot = await getDocs(colRef);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, image } = form;

    if (!name.trim() || !price || !image) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }

    const id = name.toLowerCase().replace(/\s+/g, '');

    try {
      await setDoc(doc(db, 'products', id), {
        name,
        description: description || 'Sin descripción.',
        price: parseFloat(price),
        image,
      });

      alert(`✅ Servicio "${name}" añadido con éxito`);
      setForm({ name: '', description: '', price: '', image: '' });

      const colRef = collection(db, 'products');
      const snapshot = await getDocs(colRef);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert('❌ Error al añadir servicio.');
    }
  };

  return (
    <section className="max-w-xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <label className="block">
          <span className="block font-medium mb-1">Nombre del servicio*</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </label>

        <label className="block">
          <span className="block font-medium mb-1">Descripción</span>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block">
          <span className="block font-medium mb-1">Precio (S/)*</span>
          <input
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </label>

        <div className="text-sm text-gray-600 mb-2">
          📸 Para evitar errores, usa imágenes desde{' '}
          <a
            href="https://pixabay.com/es/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            https://pixabay.com/es/
          </a>{' '}
          y copia el enlace de una imagen que comience con{' '}
          <code className="bg-gray-100 px-1 py-0.5 rounded">https://cdn.pixabay.com/</code>
        </div>

        <label className="block">
          <span className="block font-medium mb-1">URL de imagen*</span>
          <input
            type="text"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </label>

        <Button type="submit">Añadir servicio</Button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Servicios existentes</h2>
        <ul className="space-y-2">
          {products.map((p) => (
            <li key={p.id} className="border p-2 rounded">
              <strong>{p.name}</strong> — S/ {p.price}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}