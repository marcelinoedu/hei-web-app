import { useState, useEffect } from "react";
import Link from "next/link";
import DecoButton from "@/components/DecoButton";

export default function Eventos() {
  const [reunioes, setReunioes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvento, setEditingEvento] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    data: "",
    local: "",
    nomeEntidade: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReunioes();
  }, []);

  const fetchReunioes = async () => {
    try {
      setLoading(true);
      // TODO: Quando o backend estiver pronto, descomentar o fetch
      // const response = await fetch("http://localhost:8080/reunioes");
      // if (!response.ok) {
      //   throw new Error("Erro ao carregar eventos");
      // }
      // const data = await response.json();
      // setReunioes(data);

      // Dados mock para desenvolvimento
      setReunioes([
        {
          id: 1,
          titulo: "Hackathon Tech 2024",
          descricao: "Competição de programação com 48 horas de duração",
          data: "2024-12-15",
          local: "Campus Insper - Sala 301",
          entidade: { name: "Hei" }
        },
        {
          id: 2,
          titulo: "Workshop de Machine Learning",
          descricao: "Aprenda os fundamentos de ML com casos práticos",
          data: "2024-12-20",
          local: "Campus Insper - Laboratório 2",
          entidade: { name: "Hei" }
        },
        {
          id: 3,
          titulo: "Feira de Projetos de Engenharia",
          descricao: "Apresentação de projetos inovadores dos estudantes",
          data: "2025-01-15",
          local: "Campus Insper - Área Externa",
          entidade: { name: "Tech Society" }
        },
        {
          id: 4,
          titulo: "Case Competition 2025",
          descricao: "Competição de casos de negócios entre equipes",
          data: "2025-02-01",
          local: "Campus Insper - Auditório Principal",
          entidade: { name: "Business Club" }
        },
        {
          id: 5,
          titulo: "Meetup com Profissionais",
          descricao: "Networking com profissionais da área de tecnologia",
          data: "2025-01-10",
          local: "Campus Insper - Auditório",
          entidade: { name: "Hei" }
        }
      ]);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOpenModal = (evento = null) => {
    if (evento) {
      setEditingEvento(evento);
      setFormData({
        titulo: evento.titulo || "",
        descricao: evento.descricao || "",
        data: evento.data || "",
        local: evento.local || "",
        nomeEntidade: evento.entidade?.name || ""
      });
    } else {
      setEditingEvento(null);
      setFormData({
        titulo: "",
        descricao: "",
        data: "",
        local: "",
        nomeEntidade: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvento(null);
    setFormData({
      titulo: "",
      descricao: "",
      data: "",
      local: "",
      nomeEntidade: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.data || !formData.nomeEntidade) {
      alert("Por favor, preencha título, data e organização");
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingEvento) {
        // Editar evento
        // TODO: Quando o backend estiver pronto, descomentar o fetch
        // const response = await fetch(`http://localhost:8080/reunioes/${editingEvento.id}`, {
        //   method: "PUT",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     titulo: formData.titulo,
        //     descricao: formData.descricao,
        //     data: formData.data,
        //     local: formData.local
        //   })
        // });
        // if (!response.ok) throw new Error("Erro ao editar evento");

        // Mock: atualizar na lista
        setReunioes(reunioes.map(r => 
          r.id === editingEvento.id 
            ? { ...r, ...formData, entidade: { name: formData.nomeEntidade } }
            : r
        ));
        alert("Evento editado com sucesso!");
      } else {
        // Criar evento
        // TODO: Quando o backend estiver pronto, descomentar o fetch
        // const response = await fetch("http://localhost:8080/reunioes", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     titulo: formData.titulo,
        //     descricao: formData.descricao,
        //     data: formData.data,
        //     local: formData.local,
        //     entidade: { name: formData.nomeEntidade }
        //   })
        // });
        // if (!response.ok) throw new Error("Erro ao criar evento");

        // Mock: adicionar à lista
        const novoEvento = {
          id: Date.now(),
          ...formData,
          entidade: { name: formData.nomeEntidade }
        };
        setReunioes([...reunioes, novoEvento]);
        alert("Evento criado com sucesso!");
      }

      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      alert("Erro ao salvar evento. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExcluir = async (evento) => {
    if (!confirm(`Deseja realmente excluir o evento "${evento.titulo}"?`)) {
      return;
    }

    try {
      // TODO: Quando o backend estiver pronto, descomentar o fetch
      // const response = await fetch(`http://localhost:8080/reunioes/${evento.id}`, {
      //   method: "DELETE"
      // });
      // if (!response.ok) throw new Error("Erro ao excluir evento");

      // Mock: remover da lista
      setReunioes(reunioes.filter(r => r.id !== evento.id));
      alert("Evento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
      alert("Erro ao excluir evento. Tente novamente.");
    }
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
            <Link href="/organizacoes" className="text-[#3a2418] hover:text-[#b53b18] transition-colors font-medium">
              Organizações
            </Link>
            <Link href="/eventos" className="text-[#b53b18] font-medium">
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
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-5xl md:text-6xl font-display tracking-wide text-[#3a2418]">
                Eventos
              </h1>
              <button
                onClick={() => handleOpenModal()}
                className="
                  w-10 h-10
                  flex items-center justify-center
                  text-[#b53b18]
                  bg-[rgba(255,122,45,0.15)]
                  hover:bg-[rgba(255,122,45,0.25)]
                  rounded-full
                  border border-[rgba(181,59,24,0.2)]
                  transition-all
                  hover:scale-110
                "
                title="Adicionar Evento"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <p className="text-lg text-[#6d4b35] max-w-2xl">
              Explore todos os eventos e reuniões das organizações estudantis do Insper
            </p>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-[#b53b18] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-[#6d4b35]">Carregando eventos...</p>
            </div>
          )}

          {/* Grid de Eventos */}
          {!loading && reunioes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reunioes.map((reuniao) => (
                <div
                  key={reuniao.id}
                  className="
                    group relative
                    rounded-2xl p-8
                    bg-gradient-to-br from-[rgba(255,252,248,0.95)] to-[rgba(255,245,230,0.92)]
                    border border-[rgba(255,190,130,0.5)]
                    shadow-[0_4px_12px_rgba(0,0,0,0.1)]
                    hover:shadow-[0_8px_24px_rgba(181,59,24,0.2)]
                    transition-all duration-300 ease-out
                  "
                  style={{
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1), inset 0 0 6px rgba(255,220,180,0.4)",
                  }}
                >
                  {/* Glow interno decorativo */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 pointer-events-none rounded-2xl transition-opacity duration-300"
                    style={{
                      background: "radial-gradient(circle at 50% 0%, rgba(255,160,80,0.25), transparent 70%)",
                    }}
                  />

                  {/* Badge de data */}
                  <div className="absolute top-4 right-4">
                    <span className="
                      inline-block px-3 py-1
                      text-xs font-medium
                      text-[#b53b18]
                      bg-[rgba(255,122,45,0.15)]
                      rounded-full
                      border border-[rgba(181,59,24,0.2)]
                    ">
                      {new Date(reuniao.data).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  {/* Conteúdo */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-display text-[#3a2418] group-hover:text-[#b53b18] transition-colors">
                        {reuniao.titulo}
                      </h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(reuniao)}
                          className="
                            w-8 h-8
                            flex items-center justify-center
                            text-[#6d4b35] hover:text-[#b53b18]
                            hover:bg-[rgba(181,59,24,0.1)]
                            rounded-lg
                            transition-all
                          "
                          title="Editar Evento"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleExcluir(reuniao)}
                          className="
                            w-8 h-8
                            flex items-center justify-center
                            text-[#b53b18] hover:text-white
                            hover:bg-[#b53b18]
                            rounded-lg
                            transition-all
                          "
                          title="Excluir Evento"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-[#6d4b35] mb-4 line-clamp-2">
                      {reuniao.descricao}
                    </p>

                    <div className="space-y-2 text-xs text-[#6d4b35] mb-4">
                      {reuniao.local && (
                        <p className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{reuniao.local}</span>
                        </p>
                      )}
                      {reuniao.entidade && (
                        <p className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>{reuniao.entidade.name}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && reunioes.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-block w-24 h-24 mb-6 bg-gradient-to-br from-[#ffeedb] to-[#fcd8b4] rounded-full flex items-center justify-center border border-[rgba(0,0,0,0.05)] shadow-inner">
                <svg className="w-12 h-12 text-[#b53b18]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xl text-[#6d4b35] mb-4">Nenhum evento encontrado</p>
              <p className="text-[#6d4b35]">Tente novamente mais tarde</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal de Criar/Editar Evento */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          style={{ backdropFilter: 'blur(8px)' }}
          onClick={handleCloseModal}
        >
          <div
            className="
              relative w-full max-w-lg
              bg-gradient-to-br from-[rgba(255,252,248,0.98)] to-[rgba(255,245,230,0.98)]
              border border-[rgba(255,190,130,0.5)]
              rounded-2xl p-8
              shadow-[0_8px_32px_rgba(0,0,0,0.2)]
            "
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 0 8px rgba(255,220,180,0.4)",
            }}
          >
            {/* Botão de fechar */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#6d4b35] hover:text-[#b53b18] hover:bg-[rgba(181,59,24,0.1)] rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Título do modal */}
            <h2 className="text-3xl font-display text-[#3a2418] mb-6">
              {editingEvento ? "Editar Evento" : "Adicionar Evento"}
            </h2>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#3a2418] mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  required
                  className="
                    w-full px-4 py-2
                    bg-white
                    border border-[rgba(181,59,24,0.2)]
                    rounded-lg
                    text-[#3a2418]
                    focus:outline-none focus:ring-2 focus:ring-[#b53b18] focus:border-transparent
                  "
                  placeholder="Ex: Hackathon Tech 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3a2418] mb-2">
                  Descrição
                </label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  rows={3}
                  className="
                    w-full px-4 py-2
                    bg-white
                    border border-[rgba(181,59,24,0.2)]
                    rounded-lg
                    text-[#3a2418]
                    focus:outline-none focus:ring-2 focus:ring-[#b53b18] focus:border-transparent
                    resize-none
                  "
                  placeholder="Descrição do evento..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#3a2418] mb-2">
                    Data *
                  </label>
                  <input
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={handleInputChange}
                    required
                    className="
                      w-full px-4 py-2
                      bg-white
                      border border-[rgba(181,59,24,0.2)]
                      rounded-lg
                      text-[#3a2418]
                      focus:outline-none focus:ring-2 focus:ring-[#b53b18] focus:border-transparent
                    "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#3a2418] mb-2">
                    Local
                  </label>
                  <input
                    type="text"
                    name="local"
                    value={formData.local}
                    onChange={handleInputChange}
                    className="
                      w-full px-4 py-2
                      bg-white
                      border border-[rgba(181,59,24,0.2)]
                      rounded-lg
                      text-[#3a2418]
                      focus:outline-none focus:ring-2 focus:ring-[#b53b18] focus:border-transparent
                    "
                    placeholder="Ex: Campus Insper - Sala 301"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3a2418] mb-2">
                  Organização *
                </label>
                <input
                  type="text"
                  name="nomeEntidade"
                  value={formData.nomeEntidade}
                  onChange={handleInputChange}
                  required
                  className="
                    w-full px-4 py-2
                    bg-white
                    border border-[rgba(181,59,24,0.2)]
                    rounded-lg
                    text-[#3a2418]
                    focus:outline-none focus:ring-2 focus:ring-[#b53b18] focus:border-transparent
                  "
                  placeholder="Ex: Hei"
                />
              </div>

              {/* Botões */}
              <div className="flex gap-4 pt-4">
                <DecoButton
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? "Salvando..." : editingEvento ? "Salvar Alterações" : "Criar Evento"}
                </DecoButton>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="
                    flex-1 px-6 py-3
                    font-display text-[15px] tracking-wide
                    text-[#6d4b35]
                    bg-transparent
                    border-2 border-[rgba(181,59,24,0.3)]
                    rounded-xl
                    hover:bg-[rgba(181,59,24,0.1)]
                    transition-all
                  "
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

