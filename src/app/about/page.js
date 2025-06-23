// src/app/about/page.js

export const metadata = {
  title: "Sobre Nosotros – Clínica Harmony",
  description: "Conoce más sobre la misión, visión y el equipo de Clínica Harmony.",
};

export default function AboutPage() {
  return (
    <section className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-blue-700">Sobre Nosotros</h1>

      <p className="text-lg text-gray-700">
        En <strong>Clínica Harmony</strong>, nos dedicamos a brindar bienestar emocional, mental y espiritual
        a través de terapias basadas en la psicología clínica, la hipnoterapia y técnicas complementarias.
      </p>

      <h2 className="text-2xl font-semibold text-blue-600">Nuestra Misión</h2>
      <p className="text-gray-700">
        Acompañar de manera empática y profesional a cada persona en su proceso de sanación y crecimiento personal.
      </p>

      <h2 className="text-2xl font-semibold text-blue-600">Nuestra Visión</h2>
      <p className="text-gray-700">
        Ser un referente en salud mental integral en el Perú, combinando ciencia y humanidad en cada tratamiento.
      </p>

      <h2 className="text-2xl font-semibold text-blue-600">Nuestro Equipo</h2>
      <p className="text-gray-700">
        Contamos con profesionales especializados en psicología, hipnoterapia y terapias complementarias,
        comprometidos con brindar atención de calidad y calidez.
      </p>
    </section>
  );
}