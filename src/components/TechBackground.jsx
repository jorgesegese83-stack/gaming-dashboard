// Fondo técnico 100% generado por código, con profundidad por capas:
// degradado de base → luz volumétrica → retícula → guías laterales → viñeta y grano.

function Crosshair({ className }) {
  return <span className={`tech-cross absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 ${className}`} />;
}

function SideRail({ side }) {
  const isLeft = side === 'left';

  return (
    <div className={`absolute inset-y-0 ${isLeft ? 'left-0' : 'right-0'} w-px bg-gradient-to-b from-white/[0.12] via-white/[0.06] to-transparent`}>
      {/* Margen rayado pegado a la guía, se desvanece hacia fuera */}
      <div className={`tech-hatch absolute inset-y-0 w-16 ${isLeft ? 'right-px tech-hatch--left' : 'left-px tech-hatch--right'}`} />
      <Crosshair className="left-1/2 top-[18vh]" />
      <Crosshair className="left-1/2 top-[64vh]" />
      <span className={`tech-beam absolute left-0 w-px ${isLeft ? '' : 'tech-beam--late'}`} />
      <span
        className={`absolute top-[18vh] whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 ${
          isLeft ? 'right-6 translate-y-3' : 'left-6 translate-y-3'
        }`}
      >
        {isLeft ? 'SYS.GRID // 04' : 'ACH.NET // ON'}
      </span>
    </div>
  );
}

export default function TechBackground() {
  return (
    <div className="tech-base absolute inset-0 overflow-hidden">
      {/* Luz volumétrica: campos de color amplios que respiran muy despacio */}
      <div className="tech-aurora tech-aurora--a absolute -inset-[20%]" />
      <div className="tech-aurora tech-aurora--b absolute -inset-[20%]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-cyan-900/10 blur-[140px]" />

      {/* Cono de luz superior teñido con el juego activo + haz diagonal */}
      <div className="tech-spotlight absolute inset-0" />
      <div className="tech-shaft absolute inset-0" />

      {/* Retícula técnica alineada con el contenedor central */}
      <div className="tech-grid-mask absolute inset-0">
        <div className="tech-grid absolute inset-y-0 left-1/2 -ml-[4000px] w-[8000px]" />
      </div>

      {/* Guías del contenedor (max-w-7xl): solo visibles cuando sobra espacio lateral */}
      <div className="absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 xl:block">
        <SideRail side="left" />
        <SideRail side="right" />
      </div>

      {/* Horizonte superior */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="tech-vignette absolute inset-0" />
      <div className="tech-noise absolute inset-0" />
    </div>
  );
}
