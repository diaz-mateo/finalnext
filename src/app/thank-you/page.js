"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../../components/Button";

export default function ThankYouPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("lastOrder");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (parsed.orderId === orderId) {
          setOrder(parsed);
        }
        localStorage.removeItem("lastOrder"); // Limpia después de mostrar
      } catch (err) {
        console.error("Error leyendo la última orden:", err);
      }
    }
  }, [orderId]);

  return (
    <section className="max-w-2xl mx-auto p-4 text-center space-y-6">
      <h1 className="text-3xl font-bold">¡Gracias por tu compra!</h1>
      <p>
        {orderId ? (
          <>Tu orden <strong>#{orderId}</strong> se ha registrado con éxito.</>
        ) : (
          "Tu compra se ha registrado con éxito."
        )}
      </p>

      {order && (
        <div className="text-left border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Resumen de tu pedido</h2>
          <ul className="space-y-2 mb-4">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} × {item.quantity}</span>
                <span>S/ {item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <p className="text-right font-bold text-lg">Total: S/ {order.total}</p>
        </div>
      )}

      <Button onClick={() => window.location.href = "/"}>
        Volver al inicio
      </Button>
    </section>
  );
}