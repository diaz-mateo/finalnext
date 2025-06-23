'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from '../../lib/firebaseConfig';
import Button from '../../components/Button';

export default function AdminPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: '',
    category: '',       // ← Agregado
  });
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  // Verificar autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
        fetchProducts();
      } else {
        router.push('/login');
      }
    });
    return unsubscribe;
  }, []);

  // Cargar productos
  async function fetchProducts() {
    const colRef = collection(db, 'products');
    const snap = await getDocs(colRef);
    setProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  }

  // Guardar o editar servicio
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, image, stock, category } = form;
    if (!name || !price || !image || !stock || !category) {
      alert('Completa todos los campos obligatorios.');
      return;
    }
    const id = (editingId || name).toLowerCase().replace(/\s+/g, '');

    await setDoc(doc(db, 'products', id), {
      name,
      description,
      price: parseFloat(price),
      image,
      stock: parseInt(stock, 10),
      category: category.toLowerCase(),
    });

    alert(`✅ Servicio ${editingId ? 'editado' : 'añadido'} con éxito`);
    setForm({ name:'', description:'', price:'', image:'', stock:'', category:'' });
    setEditingId(null);
    fetchProducts();
  };

  // Eliminar servicio
  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este servicio?')) return;
    await deleteDoc(doc(db, 'products', id));
    fetchProducts();
  };

  // Cerrar sesión
  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (!isAuth) return null; // evita parpadeo

  return (
    <section className="max-w-xl mx-auto space-y-8">
      <div className="flex justify-end">
        <Button onClick={handleLogout}>Cerrar sesión</Button>
      </div>

      <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <label className="block">
          <span className="font-medium">Nombre del servicio*</span>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </label>

        {/* Descripción */}
        <label className="block">
          <span className="font-medium">Descripción</span>
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        {/* Precio */}
        <label className="block">
          <span className="font-medium">Precio (S/)*</span>
          <input
            type="number"
            step="0.01"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </label>

        {/* Stock */}
        <label className="block">
          <span className="font-medium">Stock*</span>
          <input
            type="number"
            min="0"
            value={form.stock}
            onChange={e => setForm({ ...form, stock: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </label>

        {/* Categoría */}
        <label className="block">
          <span className="font-medium">Categoría*</span>
          <input
            type="text"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            placeholder="p.ej. psicoterapia"
            required
          />
        </label>

        {/* Imagen */}
        <div className="text-sm text-gray-600">
          📸 Usa imágenes desde{' '}
          <a
            href="https://pixabay.com/es/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            Pixabay
          </a>{' '}
          (deben empezar con{' '}
          <code className="bg-gray-100 px-1 py-0.5 rounded">https://cdn.pixabay.com/</code>).
        </div>
        <label className="block">
          <span className="font-medium">URL de imagen*</span>
          <input
            type="text"
            value={form.image}
            onChange={e => setForm({ ...form, image: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </label>

        <Button type="submit">
          {editingId ? 'Editar servicio' : 'Añadir servicio'}
        </Button>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-2">Servicios existentes</h2>
        <ul className="space-y-2">
          {products.map(p => (
            <li
              key={p.id}
              className="border p-2 rounded flex justify-between items-center"
            >
              <div>
                <strong>{p.name}</strong> — S/ {p.price} — Stock: {p.stock} —{' '}
                <em className="capitalize">{p.category}</em>
              </div>
              <div className="space-x-2">
                <Button
                  onClick={() => {
                    setForm({
                      name: p.name,
                      description: p.description,
                      price: p.price.toString(),
                      image: p.image,
                      stock: p.stock.toString(),
                      category: p.category,
                    });
                    setEditingId(p.id);
                  }}
                >
                  Editar
                </Button>
                <Button onClick={() => handleDelete(p.id)}>
                  Eliminar
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}