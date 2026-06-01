import React, { useState } from 'react';
import Head from 'next/head';
import { Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const SECTIONS = [
  "Claridad del Problema",
  "Rigor y Metodología",
  "Resultados e Impacto",
  "Calidad Visual e Innovación",
  "Dominio del Tema (Pitch)"
];

const GRUPOS = Array.from({ length: 16 }, (_, i) => `Grupo ${i + 1}`);

export default function EvaluacionSeminario() {
  const [grupoSeleccionado, setGrupoSeleccionado] = useState("");
  const [ratings, setRatings] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 });
  const [enviado, setEnviado] = useState(false);

  const handleStarClick = (index, value) => {
    setRatings({ ...ratings, [index]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!grupoSeleccionado || Object.values(ratings).includes(0)) {
      alert("Por favor selecciona un grupo y califica todas las secciones con estrellas.");
      return;
    }
    
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    setEnviado(true);
    // Aquí podrías conectar a una base de datos después si quieres guardar los datos.
  };

  if (enviado) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">¡Gracias por evaluar! 🌟</h1>
        <p className="text-slate-600">Tu retroalimentación ha sido registrada de forma anónima.</p>
        <button onClick={() => {setEnviado(false); setRatings({0:0,1:0,2:0,3:0,4:0}); setGrupoSeleccionado("")}} 
                className="mt-8 text-blue-600 font-medium underline">Evaluar otro grupo</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <Head><title>Evaluación Feria de Investigación</title></Head>
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900">Feria de Investigación</h1>
          <p className="text-slate-500 mt-2">Evaluación anónima de pares</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Selecciona el Grupo:</label>
            <select 
              value={grupoSeleccionado}
              onChange={(e) => setGrupoSeleccionado(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition"
            >
              <option value="">-- Elige un grupo --</option>
              {GRUPOS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          {SECTIONS.map((seccion, idx) => (
            <div key={idx} className="border-t border-slate-100 pt-6">
              <label className="block text-sm font-medium text-slate-800 mb-3">{seccion}</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(idx, star)}
                    className="transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star 
                      size={32} 
                      fill={star <= ratings[idx] ? "#f59e0b" : "transparent"} 
                      color={star <= ratings[idx] ? "#f59e0b" : "#cbd5e1"} 
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button 
            type="submit"
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transform transition active:scale-95 shadow-lg"
          >
            Enviar Evaluación
          </button>
        </form>
      </div>
    </div>
  );
}
