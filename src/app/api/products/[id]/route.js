import { db } from "../../../../lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export async function GET(request, contextPromise) {
  const context = await contextPromise;
  const { id } = context.params;

  try {
    const docRef = doc(db, "products", id);
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
      return new Response(JSON.stringify({ error: "Producto no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const product = { id: snap.id, ...snap.data() };
    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}