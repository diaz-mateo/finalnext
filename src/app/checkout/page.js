"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../../lib/firebaseConfig";
import Button from "../../components/Button";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, apellido, email } = form;

    if (!nombre || !apellido || !email) {
      alert("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      // 1) Crear orden en Firebase
      const orderRef = await addDoc(collection(db, "orders"), {
        userInfo: { nombre, apellido, email },
        items,
        total,
        createdAt: serverTimestamp(),
      });

      // 2) Actualizar stock
      for (const item of items) {
        const ref = doc(db, "products", item.id);
        await updateDoc(ref, {
          stock: increment(-item.quantity),
        });
      }

      // 3) Guardar resumen de la orden en localStorage
      localStorage.setItem("lastOrder", JSON.stringify({
        orderId: orderRef.id,
        nombre,
        apellido,
        email,
        items,
        total,
      }));

      // 4) Redirigir y luego limpiar el carrito
      router.push(`/thank-you?orderId=${orderRef.id}`);
      setTimeout(() => {
        clearCart();
      }, 1000);

    } catch (err) {
      console.error(err);
      alert("❌ Error procesando la compra.");
    } finally {
      setLoading(false);
    }
  };

  if (!items.length) {
    return (
      <section className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-600">Tu carrito está vacío.</p>
        <Button onClick={() => router.push("/")}>Volver al catálogo</Button>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Finalizar compra</h1>

      {/* Formulario de datos del cliente */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="font-medium">Nombre*</span>
          <input
            type="text"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </label>

        <label className="block">
          <span className="font-medium">Apellido*</span>
          <input
            type="text"
            value={form.apellido}
            onChange={(e) => setForm({ ...form, apellido: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </label>

        <label className="block">
          <span className="font-medium">Correo electrónico*</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </label>

        {/* Resumen del pedido */}
        <div className="border-t pt-4 space-y-4">
          <h2 className="text-xl font-semibold">Resumen de tu pedido</h2>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id} className="flex items-center space-x-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={60}
                  className="rounded"
                />
                <div className="flex-1">
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × S/ {item.price}
                  </p>
                </div>
                <p className="font-medium">
                  S/ {item.price * item.quantity}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-right text-2xl font-bold">Total: S/ {total}</p>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Procesando..." : "Confirmar Compra"}
          </Button>
        </div>
      </form>
    </section>
  );
}