"use client";

import Image from "next/image";
import { useCart } from "../../context/CartContext";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <section>
        <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>
        <p className="text-gray-600">Tu carrito está vacío.</p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center border rounded p-4 space-x-4"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={75}
              className="rounded"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">S/ {item.price}</p>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="px-2 py-1 border rounded"
                >
                  –
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
              </div>
            </div>
            <Button onClick={() => removeItem(item.id)}>Eliminar</Button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-2xl font-bold">Total: S/ {total}</p>
        <div className="flex gap-4">
          <Button onClick={clearCart}>Vaciar carrito</Button>
          <Button onClick={() => router.push("/checkout")}>Finalizar compra</Button>
        </div>
      </div>
    </section>
  );
}