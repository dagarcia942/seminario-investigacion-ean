import React, { useState } from 'react';
import Head from 'next/head';
import { Star, Sparkles, Trophy, MessageSquare, CheckCircle2, ArrowRight, Send, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

const SECTIONS = [
  { title: "Claridad del Problema", description: "¿Qué tan bien se entiende el problema que están investigando?", emoji: "🎯" },
  { title: "Rigor y Metodología", description: "¿La metodología es clara, válida y bien aplicada?", emoji: "🔬" },
  { title: "Resultados e Impacto", description: "¿Los resultados son sólidos y relevantes?", emoji: "📊" },
  { title: "Calidad Visual e Innovación", description: "¿La presentación es atractiva y creativa?", emoji: "✨" },
  { title: "Dominio del Tema (Pitch)", description: "¿Demuestran conocimiento y seguridad al exponer?", emoji: "🎤" }
];

const GRUPOS = Array.from({ length: 17 }, (_, i) => `Grupo ${i + 1}`);
const FEEDBACK_LABELS = ["", "Necesita trabajo", "Aceptable", "Bueno", "Muy bueno", "¡Excelente!"];
const FEEDBACK_COLORS = ["", "text-rose-400", "text-orange-400", "text-yellow-400", "text-emerald-400", "text-cyan-400"];
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
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 }, colors: ['#06b6d4', '#a855f7', '#f59e0b'] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!grupoSeleccionado || Object.values(ratings).includes(0)) {
      alert("Por favor selecciona un grupo y califica todas las secciones.");
      return;
    }
    const end = Date.now() + 2000;
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#06b6d4', '#a855f7', '#f59e0b', '#ec4899'] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#06b6d4', '#a855f7', '#f59e0b', '#ec4899'] });
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
      <div className="min-h-screen bg-grid flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
        <Head><title>¡Evaluación enviada!</title></Head>
        <div className="glass-strong rounded-3xl shadow-2xl p-10 max-w-md glow-purple relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-2xl mb-6 shadow-lg animate-bounce">
            <Trophy size={40} className="text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
            ¡Evaluación enviada!
          </h1>
          <p className="text-slate-300 mb-6">Has evaluado a <strong className="text-white">{grupoSeleccionado}</strong></p>
          <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-2xl p-6 mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-300 mb-3">Puntaje otorgado</p>
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={28} fill={i < Math.round(totalStars/5) ? "#fbbf24" : "transparent"} color="#fbbf24" strokeWidth={2}/>
              ))}
            </div>
            <p className="font-display text-4xl font-bold text-amber-400">{totalStars}<span className="text-slate-500 text-2xl">/25</span></p>
          </div>
          <p className="text-sm text-slate-400 mb-6">Tu retroalimentación ha sido registrada de forma anónima.</p>
          <button onClick={handleReset}
            className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 active:scale-95 transition flex items-center justify-center gap-2">
            Evaluar otro grupo <ArrowRight size={18}/>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grid py-8 px-4 relative">
      <Head><title>Feria de Investigación · Evaluación</title></Head>
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="glass-strong rounded-3xl shadow-2xl p-6 mb-4 sticky top-4 z-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-2xl shadow-lg">
              <Sparkles size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Feria de Investigación
              </h1>
              <p className="text-xs text-slate-400">Evaluación anónima de pares</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-slate-300 flex items-center gap-1">
                <Zap size={12} className="text-cyan-400"/> Progreso: {Math.round(progress)}%
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <Star size={14} fill="#fbbf24" color="#fbbf24" />
                {totalStars} pts
              </span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}>
                <div className="absolute inset-0 animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Selector de grupo */}
          <div className="glass rounded-3xl shadow-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-7 h-7 bg-gradient-to-br from-cyan-500 to-purple-500 text-white rounded-full text-sm font-bold">1</span>
              <label className="font-bold text-white">Selecciona el grupo a evaluar</label>
              {grupoSeleccionado && <CheckCircle2 size={18} className="text-emerald-400 ml-auto" />}
            </div>
            <select value={grupoSeleccionado} onChange={(e) => setGrupoSeleccionado(e.target.value)}
              className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition font-medium text-white">
              <option value="" className="bg-slate-900">-- Elige un grupo --</option>
              {GRUPOS.map(g => <option key={g} value={g} className="bg-slate-900">{g}</option>)}
            </select>
          </div>

          {/* Secciones */}
          {SECTIONS.map((seccion, idx) => {
            const currentRating = ratings[idx];
            const hovered = hoveredStar.section === idx ? hoveredStar.star : 0;
            const displayedRating = hovered || currentRating;
            const isCompleted = currentRating > 0;
            return (
              <div key={idx} className={`glass rounded-3xl shadow-xl p-6 transition-all ${isCompleted ? 'ring-1 ring-emerald-400/40' : ''}`}>
                <div className="flex items-start gap-3 mb-1">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-gradient-to-br from-cyan-500 to-purple-500 text-white rounded-full text-sm font-bold flex-shrink-0">
                    {idx + 2}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{seccion.emoji}</span>
                      <h3 className="font-display font-bold text-white">{seccion.title}</h3>
                      {isCompleted && <CheckCircle2 size={18} className="text-emerald-400 ml-auto" />}
                    </div>
                    <p className="text-sm text-slate-400 mt-1">{seccion.description}</p>
                  </div>
                </div>
                <div className="flex gap-1.5 ml-10 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button"
                      onClick={() => handleStarClick(idx, star)}
                      onMouseEnter={() => setHoveredStar({ section: idx, star })}
                      onMouseLeave={() => setHoveredStar({ section: null, star: null })}
                      className="transition-all hover:scale-125 active:scale-110 focus:outline-none"
                      aria-label={`${star} estrella${star > 1 ? 's' : ''}`}>
                      <Star size={36}
                        fill={star <= displayedRating ? "#fbbf24" : "transparent"}
                        color={star <= displayedRating ? "#fbbf24" : "#475569"}
                        strokeWidth={2}
                        className={star <= displayedRating ? "drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" : ""} />
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
          <div className="glass rounded-3xl shadow-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-7 h-7 bg-gradient-to-br from-cyan-500 to-purple-500 text-white rounded-full text-sm font-bold">
                {SECTIONS.length + 2}
              </span>
              <MessageSquare size={20} className="text-cyan-400" />
              <label className="font-bold text-white">Comentarios (opcional)</label>
            </div>
            <p className="text-sm text-slate-400 mb-3 ml-10">
              Comparte una sugerencia, lo que más te gustó o algo que podrían mejorar.
            </p>
            <textarea value={comentario}
              onChange={(e) => setComentario(e.target.value.slice(0, MAX_COMMENT))}
              placeholder="Escribe aquí tu retroalimentación constructiva…"
              rows={4}
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition resize-none text-white placeholder:text-slate-500" />
            <div className="flex justify-end mt-2">
              <span className={`text-xs font-medium ${comentario.length > MAX_COMMENT * 0.9 ? 'text-amber-400' : 'text-slate-500'}`}>
                {comentario.length}/{MAX_COMMENT}
              </span>
            </div>
          </div>

          {/* Botón enviar */}
          <button type="submit" disabled={!allComplete}
            className={`w-full font-bold py-4 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 font-display ${
              allComplete
                ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-purple-500/50 active:scale-95 cursor-pointer'
                : 'bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed'
            }`}>
            {allComplete ? <>Enviar evaluación <Send size={18}/></> : <>Completa todas las secciones</>}
          </button>
        </form>
      </div>
    </div>
  );
}
