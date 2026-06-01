import React, { useState } from 'react';
import Head from 'next/head';
import { Star, Sparkles, Trophy, MessageSquare, CheckCircle2, ArrowRight, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

const SECTIONS = [
  { 
    title: "Claridad del Problema",
    description: "¿Qué tan bien se entiende el problema que están investigando?",
    emoji: "🎯"
  },
  { 
    title: "Rigor y Metodología",
    description: "¿La metodología es clara, válida y bien aplicada?",
    emoji: "🔬"
  },
  { 
    title: "Resultados e Impacto",
    description: "¿Los resultados son sólidos y relevantes?",
    emoji: "📊"
  },
  { 
    title: "Calidad Visual e Innovación",
    description: "¿La presentación es atractiva y creativa?",
    emoji: "✨"
  },
  { 
    title: "Dominio del Tema (Pitch)",
    description: "¿Demuestran conocimiento y seguridad al exponer?",
    emoji: "🎤"
  }
];

const GRUPOS = Array.from({ length: 16 }, (_, i) => `Grupo ${i + 1}`);
const FEEDBACK_LABELS = ["", "Necesita trabajo", "Aceptable", "Bueno", "Muy bueno", "¡Excelente!"];
const FEEDBACK_COLORS = ["", "text-red-500", "text-orange-500", "text-yellow-600", "text-green-500", "text-emerald-500"];
const MAX_COMMENT = 500;

export default function EvaluacionSeminario() {
  const [grupoSeleccionado, setGrupoSeleccionado] = useState("");
  const [ratings, setRatings] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 });
  const [comentario, setComentario] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [hoveredStar, setHoveredStar] = useState({ section: null, star: null });

  const totalStars = Object.values(ratings).reduce((a, b) => a + b, 0);
  const sectionsCompleted = Object.values(ratings).filter(r => r > 0).length;
  const progress = ((grupoSeleccionado ? 1 : 0) + sectionsCompleted) / (SECTIONS.length + 1) * 100;
  const allComplete = grupoSeleccionado && Object.values(ratings).every(r => r > 0);

  const handleStarClick = (index, value) => {
    const previousValue = ratings[index];
    setRatings({ ...ratings, [index]: value });
    
    if (value === 5 && previousValue !== 5) {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#fbbf24', '#fcd34d']
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!grupoSeleccionado || Object.values(ratings).includes(0)) {
      alert("Por favor selecciona un grupo y califica todas las secciones.");
      return;
    }
    
    const duration = 2000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({
        particleCount: 5, angle: 60, spread: 55, origin: { x: 0 },
        colors: ['#a78bfa', '#f59e0b', '#10b981']
      });
      confetti({
        particleCount: 5, angle: 120, spread: 55, origin: { x: 1 },
        colors: ['#a78bfa', '#f59e0b', '#10b981']
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
    
    setEnviado(true);
  };

  const handleReset = () => {
    setEnviado(false);
    setRatings({0:0,1:0,2:0,3:0,4:0});
    setGrupoSeleccionado("");
    setComentario("");
  };

  if (enviado) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-amber-50 p-4 text-center">
        <Head><title>¡Evaluación enviada!</title></Head>
        
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md border border-purple-100">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-6 shadow-lg animate-bounce">
            <Trophy size={40} className="text-white" />
          </div>
          
          <h1 className="text-4xl font-extrabold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            ¡Evaluación enviada!
          </h1>
          
          <p className="text-slate-600 mb-6">Has evaluado a <strong>{grupoSeleccionado}</strong></p>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 mb-6 border border-amber-100">
            <p className="text-sm font-medium text-amber-900 mb-2">Puntaje otorgado</p>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={28} fill={i < Math.round(totalStars/5) ? "#f59e0b" : "transparent"} color="#f59e0b" strokeWidth={2}/>
              ))}
            </div>
            <p className="text-3xl font-extrabold text-amber-600">{totalStars} / 25 ⭐</p>
          </div>
          
          <p className="text-sm text-slate-500 mb-6">Tu retroalimentación ha sido registrada de forma anónima.</p>
          
          <button 
            onClick={handleReset}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition flex items-center justify-center gap-2"
          >
            Evaluar otro grupo <ArrowRight size={18}/>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-amber-50 py-8 px-4">
      <Head><title>Feria de Investigación · Evaluación</title></Head>
      
      <div className="max-w-2xl mx-auto">
        
        {/* Header con progreso */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-4 border border-purple-100 sticky top-4 z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <Sparkles size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-extrabold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Feria de Investigación
              </h1>
              <p className="text-xs text-slate-500">Evaluación anónima de pares</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-slate-600">Progreso: {Math.round(progress)}%</span>
              <span className="flex items-center gap-1 text-amber-600">
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                {totalStars} pts
              </span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Selector de grupo */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-purple-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-7 h-7 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold">1</span>
              <label className="font-bold text-slate-800">Selecciona el grupo a evaluar</label>
              {grupoSeleccionado && <CheckCircle2 size={18} className="text-emerald-500 ml-auto" />}
            </div>
            <select 
              value={grupoSeleccionado}
              onChange={(e) => setGrupoSeleccionado(e.target.value)}
              className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 outline-none transition font-medium text-slate-700"
            >
              <option value="">-- Elige un grupo --</option>
              {GRUPOS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          {/* Secciones de evaluación */}
          {SECTIONS.map((seccion, idx) => {
            const currentRating = ratings[idx];
            const hovered = hoveredStar.section === idx ? hoveredStar.star : 0;
            const displayedRating = hovered || currentRating;
            const isCompleted = currentRating > 0;
            
            return (
              <div 
                key={idx} 
                className={`bg-white rounded-3xl shadow-xl p-6 border-2 transition-all ${
                  isCompleted ? 'border-emerald-200 bg-gradient-to-br from-white to-emerald-50/30' : 'border-purple-100'
                }`}
              >
                <div className="flex items-start gap-3 mb-1">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold flex-shrink-0">
                    {idx + 2}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{seccion.emoji}</span>
                      <h3 className="font-bold text-slate-800">{seccion.title}</h3>
                      {isCompleted && <CheckCircle2 size={18} className="text-emerald-500 ml-auto" />}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{seccion.description}</p>
                  </div>
                </div>
                
                <div className="flex gap-1.5 ml-10 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(idx, star)}
                      onMouseEnter={() => setHoveredStar({ section: idx, star })}
                      onMouseLeave={() => setHoveredStar({ section: null, star: null })}
                      className="transition-all hover:scale-125 active:scale-110 focus:outline-none"
                      aria-label={`${star} estrella${star > 1 ? 's' : ''}`}
                    >
                      <Star 
                        size={36} 
                        fill={star <= displayedRating ? "#f59e0b" : "transparent"} 
                        color={star <= displayedRating ? "#f59e0b" : "#cbd5e1"} 
                        strokeWidth={2}
                        className={star <= displayedRating ? "drop-shadow-md" : ""}
                      />
                    </button>
                  ))}
                </div>
                
                {displayedRating > 0 && (
                  <p className={`text-sm font-bold ml-10 mt-2 ${FEEDBACK_COLORS[displayedRating]}`}>
                    {FEEDBACK_LABELS[displayedRating]}
                  </p>
                )}
              </div>
            );
          })}

          {/* Comentarios */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-purple-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-7 h-7 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold">
                {SECTIONS.length + 2}
              </span>
              <MessageSquare size={20} className="text-indigo-600" />
              <label className="font-bold text-slate-800">Comentarios (opcional)</label>
            </div>
            <p className="text-sm text-slate-500 mb-3 ml-10">
              Comparte una sugerencia, lo que más te gustó o algo que podrían mejorar.
            </p>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value.slice(0, MAX_COMMENT))}
              placeholder="Escribe aquí tu retroalimentación constructiva…"
              rows={4}
              className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 outline-none transition resize-none text-slate-700"
            />
            <div className="flex justify-end mt-2">
              <span className={`text-xs font-medium ${comentario.length > MAX_COMMENT * 0.9 ? 'text-amber-600' : 'text-slate-400'}`}>
                {comentario.length}/{MAX_COMMENT}
              </span>
            </div>
          </div>

          {/* Botón enviar */}
          <button 
            type="submit"
            disabled={!allComplete}
            className={`w-full font-bold py-4 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 ${
              allComplete 
                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 text-white hover:shadow-2xl active:scale-95 cursor-pointer' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {allComplete ? (
              <>Enviar evaluación <Send size={18}/></>
            ) : (
              <>Completa todas las secciones para enviar</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
