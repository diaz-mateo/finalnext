import { db } from "../../../lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export async function GET(request) {
  try {
    const colRef = collection(db, "products"); // ← ✅ Volvemos a 'products'
    const snapshot = await getDocs(colRef);

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error en /api/products →", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}