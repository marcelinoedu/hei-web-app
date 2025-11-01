import Image from "next/image";
import Link from "next/link";
import DecoButton from "@/components/DecoButton";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradiente - mesmo do AuthLayout */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 25% 35%, rgba(255,210,170,0.4) 0%, rgba(250,230,210,0.8) 20%, rgba(243,230,215,1) 60%), linear-gradient(180deg, #f8ecda 0%, #f1dfc4 100%)",
        }}
        aria-hidden="true"
      />
      
      {/* Glow decorativo */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "-10%",
          top: "15%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          filter: "blur(60px)",
          background:
            "radial-gradient(circle at 35% 35%, rgba(255,122,45,0.25) 0%, rgba(181,59,24,0.1) 25%, rgba(0,0,0,0) 60%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Textura grain */}
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30">
        <svg className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain">
            <feTurbulence baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" opacity="0.05" fill="#000" />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-20 px-6 md:px-12 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ffeedb] to-[#fcd8b4] border border-[rgba(0,0,0,0.05)] shadow-inner flex items-center justify-center">
              <div className="w-6 h-6 rounded-sm bg-gradient-to-br from-[#ff7a2d] to-[#b53b18] shadow-md"></div>
            </div>
            <span className="text-xl font-display tracking-wide text-[#3a2418] font-bold">
              Hub Insper
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/organizacoes" className="text-[#3a2418] hover:text-[#b53b18] transition-colors font-medium">
              Organizações
            </Link>
            <Link href="/eventos" className="text-[#3a2418] hover:text-[#b53b18] transition-colors font-medium">
              Eventos
            </Link>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Título Principal */}
          <h1 className="text-5xl md:text-7xl font-display tracking-wide text-[#3a2418] leading-tight">
            Conecte-se com as{" "}
            <span className="text-[#b53b18]">Organizações Estudantis</span>{" "}
            do Insper
          </h1>

          {/* Subtítulo */}
          <p className="text-lg md:text-xl text-[#6d4b35] max-w-2xl mx-auto">
            Descubra entidades, participe de eventos e faça parte de uma comunidade vibrante e engajada.
          </p>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/organizacoes" className="w-full sm:w-auto">
              <DecoButton className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-lg">
                Explorar Organizações
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </DecoButton>
            </Link>
            
            <Link href="/eventos">
              <button className="
                w-full sm:w-auto
                px-8 py-4
                font-display text-lg tracking-wide
                text-[#b53b18]
                bg-transparent
                border-2 border-[#b53b18]
                rounded-xl
                transition-all duration-300 ease-out
                hover:bg-[#b53b18] hover:text-white
                hover:shadow-[0_4px_12px_rgba(181,59,24,0.3)]
                focus:outline-none focus:ring-2 focus:ring-[#b53b18]/40
              ">
                Ver Eventos
              </button>
            </Link>
          </div>
        </div>

        {/* Logo decorativo flutuante */}
        <div className="absolute left-10 bottom-20 hidden lg:block">
          <div className="transform animate-float">
            <Image 
              width={200} 
              height={200} 
              src="/HEI.png" 
              alt="HEI" 
              className="opacity-20"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
        </div>
      </main>

      {/* Elementos decorativos */}
      <div className="pointer-events-none absolute left-20 top-1/2 hidden xl:block">
        <div className="w-2 h-2 rounded-full bg-[#b67a33] opacity-60 animate-pulse-slow mb-3"></div>
        <div className="w-3 h-3 rounded-full bg-[#ff7a2d] opacity-40 animate-pulse-slower"></div>
      </div>

      {/* Onda decorativa inferior */}
      <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none">
        <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-full h-full opacity-10">
          <path d="M0,80 C200,160 400,0 800,80 L800,200 L0,200 Z" fill="#d5b48f" />
        </svg>
      </div>
    </div>
  );
}

