import { useState } from "react";
import Link from "next/link";
import DecoButton from "@/components/DecoButton";

export default function Organizacoes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    nicho: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dados mock para desenvolvimento
  const [organizacoes, setOrganizacoes] = useState([
    {
      nome: "Hei",
      nicho: "Tecnologia",
      area: "Inovação e Desenvolvimento"
    },
    {
      nome: "Tech Society",
      nicho: "Engenharia",
      area: "Software e Hardware"
    },
    {
      nome: "Business Club",
      nicho: "Negócios",
      area: "Consultoria e Empreendedorismo"
    },
    {
      nome: "Finance Lab",
      nicho: "Finanças",
      area: "Mercados e Investimentos"
    },
    {
      nome: "Design Studio",
      nicho: "Design",
      area: "UI/UX e Comunicação Visual"
    },
    {
      nome: "Data Science Hub",
      nicho: "Ciência de Dados",
      area: "Analytics e Machine Learning"
    }
  ]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.nicho) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Quando o backend estiver pronto, descomentar o fetch
      // const response = await fetch("http://localhost:8080/entidades", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData)
      // });
      // if (!response.ok) throw new Error("Erro ao criar organização");

      setOrganizacoes([...organizacoes, formData]);
      setIsModalOpen(false);
      setFormData({ nome: "", nicho: "" });
      alert("Organização criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar organização:", error);
      alert("Erro ao criar organização. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ nome: "", nicho: "" });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradiente */}
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
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ffeedb] to-[#fcd8b4] border border-[rgba(0,0,0,0.05)] shadow-inner flex items-center justify-center">
              <div className="w-6 h-6 rounded-sm bg-gradient-to-br from-[#ff7a2d] to-[#b53b18] shadow-md"></div>
            </div>
            <span className="text-xl font-display tracking-wide text-[#3a2418] font-bold">
              Hub Insper
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/organizacoes" className="text-[#b53b18] font-medium">
              Organizações
            </Link>
            <Link href="/eventos" className="text-[#3a2418] hover:text-[#b53b18] transition-colors font-medium">
              Eventos
            </Link>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Título */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display tracking-wide text-[#3a2418]">
                Organizações Estudantis
              </h1>
              <DecoButton onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
                + Adicionar Organização
              </DecoButton>
            </div>
            <p className="text-lg text-[#6d4b35] max-w-2xl">
              Explore todas as organizações estudantis do Insper e encontre a que mais combina com você
            </p>
          </div>

          {/* Grid de Organizações */}
          {organizacoes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organizacoes.map((org, index) => (
                <div
                  key={index}
                  className="
                    group relative
                    rounded-2xl p-8
                    bg-gradient-to-br from-[rgba(255,252,248,0.95)] to-[rgba(255,245,230,0.92)]
                    border border-[rgba(255,190,130,0.5)]
                    shadow-[0_4px_12px_rgba(0,0,0,0.1)]
                    hover:shadow-[0_8px_24px_rgba(181,59,24,0.2)]
                    transition-all duration-300 ease-out
                    cursor-pointer
                  "
                  style={{
                    boxShadow:
                      "0 4px 12px rgba(0,0,0,0.1), inset 0 0 6px rgba(255,220,180,0.4)",
                  }}
                >
                  {/* Glow interno decorativo */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 pointer-events-none rounded-2xl transition-opacity duration-300"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 0%, rgba(255,160,80,0.25), transparent 70%)",
                    }}
                  />

                  {/* Badge de nicho */}
                  <div className="absolute top-4 right-4">
                    <span className="
                      inline-block px-3 py-1
                      text-xs font-medium
                      text-[#b53b18]
                      bg-[rgba(255,122,45,0.15)]
                      rounded-full
                      border border-[rgba(181,59,24,0.2)]
                    ">
                      {org.nicho}
                    </span>
                  </div>

                  {/* Conteúdo */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-display text-[#3a2418] mb-6 group-hover:text-[#b53b18] transition-colors">
                      {org.nome}
                    </h3>

                    <div className="pt-4 border-t border-[rgba(0,0,0,0.08)]">
                      <Link href={`/organizacoes/${encodeURIComponent(org.nome)}`} className="block">
                        <DecoButton className="w-full">
                          Saiba Mais
                        </DecoButton>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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

      {/* Modal de Adicionar Organização */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <div className="
            relative
            w-full max-w-md
            rounded-2xl p-8 md:p-12
            border
            overflow-hidden
            bg-gradient-to-br from-[rgba(255,252,248,0.98)] to-[rgba(255,245,230,0.95)]
            border-[rgba(255,190,130,0.5)]
            shadow-2xl
          " style={{
            boxShadow: "0 16px 32px rgba(0,0,0,0.2), inset 0 0 10px rgba(255,220,180,0.5)"
          }}>
            {/* Glow decorativo */}
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 80% 20%, rgba(255,160,80,0.25), transparent 60%)",
              }}
            />

            {/* Conteúdo do Modal */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-display tracking-wide text-[#3a2418]">
                  Nova Organização
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="
                    w-8 h-8
                    flex items-center justify-center
                    text-[#6d4b35] hover:text-[#b53b18]
                    hover:bg-[rgba(181,59,24,0.1)]
                    rounded-lg
                    transition-all
                  "
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <label className="block">
                  <span className="text-sm font-medium text-[#b53b18]">Nome da Organização</span>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="
                      mt-1 w-full rounded-md p-3 
                      bg-[rgba(255,255,255,0.75)] 
                      border border-[#e2c6a4]
                      text-[#3a2418]
                      placeholder-[#a88967]
                      focus:outline-none focus:ring-2 focus:ring-[#ff7a2d]/40
                      transition
                    "
                    placeholder="Ex: Tech Society"
                    required
                  />
                </label>

                {/* Nicho */}
                <label className="block">
                  <span className="text-sm font-medium text-[#b53b18]">Nicho</span>
                  <input
                    type="text"
                    name="nicho"
                    value={formData.nicho}
                    onChange={handleInputChange}
                    className="
                      mt-1 w-full rounded-md p-3 
                      bg-[rgba(255,255,255,0.75)] 
                      border border-[#e2c6a4]
                      text-[#3a2418]
                      placeholder-[#a88967]
                      focus:outline-none focus:ring-2 focus:ring-[#ff7a2d]/40
                      transition
                    "
                    placeholder="Ex: Tecnologia"
                    required
                  />
                </label>

                {/* Botões */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="
                      flex-1
                      px-6 py-3
                      font-display text-sm tracking-wide
                      text-[#6d4b35]
                      bg-transparent
                      border-2 border-[#e2c6a4]
                      rounded-xl
                      transition-all duration-300 ease-out
                      hover:bg-[rgba(0,0,0,0.05)]
                      focus:outline-none focus:ring-2 focus:ring-[#ff7a2d]/40
                    "
                  >
                    Cancelar
                  </button>
                  <DecoButton type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? "Salvando..." : "Criar"}
                  </DecoButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

