import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 25% 35%, rgba(255,210,170,0.4) 0%, rgba(250,230,210,0.8) 20%, rgba(243,230,215,1) 60%), linear-gradient(180deg, #f8ecda 0%, #f1dfc4 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute pointer-events-none"
        style={{
          left: "-8%",
          top: "10%",
          width: "640px",
          height: "640px",
          borderRadius: "50%",
          filter: "blur(60px)",
          background:
            "radial-gradient(circle at 35% 35%, rgba(255,122,45,0.35) 0%, rgba(181,59,24,0.15) 25%, rgba(0,0,0,0) 60%)",
          mixBlendMode: "multiply",
        }}
      />

      
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30">
        <svg className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain">
            <feTurbulence baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" opacity="0.05" fill="#000" />
        </svg>
      </div>

      
      <div className="absolute left-0 top-0 bottom-0 w-1/2 md:w-2/5 flex items-center justify-center">
        <div className="relative w-full max-w-sm px-6 md:px-10">
          <div className="transform -translate-x-6 md:-translate-x-12 animate-float">
            <img
              src="/HEI.png"
              alt="Hub fox logo"
              className="w-64 md:w-80 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          <div className="absolute -left-6 bottom-10 hidden md:block">
            <div className="w-36 h-0.5 bg-gradient-to-r from-transparent via-[#b67a33] to-transparent opacity-70"></div>
            <div className="mt-3 w-28 h-0.5 bg-gradient-to-r from-transparent via-[#b67a33] to-transparent opacity-50"></div>
            <div className="mt-4 w-20 h-0.5 bg-gradient-to-r from-transparent via-[#b67a33] to-transparent opacity-30"></div>
          </div>
        </div>
      </div>

      {/* AUTH CARD DESTACADO */}
      <main className="relative z-10 w-full max-w-md mx-6 md:mx-0 md:ml-auto md:mr-20">
        <div
          className="rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden border"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,252,248,0.95) 0%, rgba(255,245,230,0.92) 100%)",
            borderColor: "rgba(255,190,130,0.5)",
            boxShadow:
              "0 16px 32px rgba(0,0,0,0.15), inset 0 0 10px rgba(255,220,180,0.5), inset 0 -2px 6px rgba(0,0,0,0.1)",
          }}
        >
          {/* Glow suave interno decorativo */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 80% 20%, rgba(255,160,80,0.25), transparent 60%)",
            }}
          />

          {/* Header / Title */}
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#ffeedb] to-[#fcd8b4] border border-[rgba(0,0,0,0.05)] shadow-inner">
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#ff7a2d] to-[#b53b18] shadow-md"></div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display tracking-wide text-[#3a2418]">
                Entrar
              </h1>
              <p className="text-sm text-[#6d4b35] mt-0.5">Hub de Entidades — Insper</p>
            </div>
          </div>

          {/* children */}
          <div className="space-y-4 relative z-10">{children}</div>

          {/* Footer
          <div className="mt-8 border-t border-[rgba(0,0,0,0.08)] pt-4 text-xs text-[#6a5140] flex items-center justify-between relative z-10">
            <span>© {new Date().getFullYear()} Hub de Entidades</span>
            <span className="hidden md:inline">Design inspired by 1950s Art Deco & UPA style</span>
          </div> */}
        </div>
      </main>

      {/* Elementos decorativos */}
      <div className="pointer-events-none absolute right-10 top-24 hidden lg:block">
        <div className="w-2 h-2 rounded-full bg-[#b67a33] opacity-60 animate-pulse-slow mb-3"></div>
        <div className="w-3 h-3 rounded-full bg-[#ff7a2d] opacity-40 animate-pulse-slower"></div>
      </div>

      <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-40 pointer-events-none">
        <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-full h-full opacity-10">
          <path d="M0,80 C200,160 400,0 800,80 L800,200 L0,200 Z" fill="#d5b48f" />
        </svg>
      </div>

     {/* Inline styles for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-8px) translateX(-4px); }
          100% { transform: translateY(0) translateX(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes pulseSlow { 0% { opacity: 0.35 } 50% { opacity: 0.9 } 100% { opacity: 0.35 } }
        .animate-pulse-slow { animation: pulseSlow 3.5s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulseSlow 5.5s ease-in-out infinite; }
        .font-display { font-family: 'Playfair Display', 'Cormorant Garamond', ui-serif, Georgia, 'Times New Roman', serif; }
      `}</style>
    </div>
  );
}
