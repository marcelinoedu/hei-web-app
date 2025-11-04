import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import DecoButton from "@/components/DecoButton";
import Header from "@/components/Header";
import { getAuthHeaders, handleApiError } from "@/utils/auth";

export default function DetalhesOrganizacao() {
  const router = useRouter();
  const { nome } = router.query;
  const [organizacao, setOrganizacao] = useState(null);
  const [isModalReuniaoOpen, setIsModalReuniaoOpen] = useState(false);
  const [editingReuniao, setEditingReuniao] = useState(null);
  const [formDataReuniao, setFormDataReuniao] = useState({
    titulo: "",
    descricao: "",
    data: "",
    local: ""
  });
  const [isSubmittingReuniao, setIsSubmittingReuniao] = useState(false);

  // Função auxiliar para buscar organização ignorando referências circulares
  const fetchOrganizacaoData = async (nomeOrg) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entidades/${encodeURIComponent(nomeOrg)}`);
    if (!response.ok) throw new Error("Erro ao buscar organização");
    
    const text = await response.text();
    
    // Extrair campos básicos antes do loop infinito começar
    const idMatch = text.match(/"id"\s*:\s*(\d+)/);
    const nameMatch = text.match(/"name"\s*:\s*"([^"]+)"/);
    const nichoMatch = text.match(/"nicho"\s*:\s*"([^"]+)"/);
    const areasMatch = text.match(/"areas"\s*:\s*"([^"]*)"/);
    
    // Buscar reuniões separadamente
    const reunioesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reunioes/entidade/${encodeURIComponent(nomeOrg)}`);
    const reunioesData = reunioesResponse.ok ? await reunioesResponse.json() : [];
    
    return {
      id: idMatch ? parseInt(idMatch[1]) : null,
      name: nameMatch ? nameMatch[1] : nomeOrg,
      nicho: nichoMatch ? nichoMatch[1] : '',
      areas: areasMatch ? areasMatch[1] : '',
      eventos: reunioesData.map(r => ({
        id: r.id,
        nome: r.titulo,
        descricao: r.descricao || "",
        data: r.data,
        local: r.local || ""
      }))
    };
  };

  useEffect(() => {
    if (nome) {
      const nomeDecodificado = decodeURIComponent(nome);
      
      fetchOrganizacaoData(nomeDecodificado)
        .then(orgData => {
          setOrganizacao(orgData);
        })
        .catch(err => {
          console.error("Erro ao buscar dados:", err);
          alert("Erro ao carregar dados da organização. Tente novamente.");
        });
    }
  }, [nome]);


  const handleInputChangeReuniao = (e) => {
    setFormDataReuniao({
      ...formDataReuniao,
      [e.target.name]: e.target.value
    });
  };

  const handleOpenModalReuniao = (reuniao = null) => {
    if (reuniao) {
      setEditingReuniao(reuniao);
      setFormDataReuniao({
        titulo: reuniao.nome || "",
        descricao: reuniao.descricao || "",
        data: reuniao.data || "",
        local: reuniao.local || ""
      });
    } else {
      setEditingReuniao(null);
      setFormDataReuniao({
        titulo: "",
        descricao: "",
        data: "",
        local: ""
      });
    }
    setIsModalReuniaoOpen(true);
  };

  const handleCloseModalReuniao = () => {
    setIsModalReuniaoOpen(false);
    setEditingReuniao(null);
    setFormDataReuniao({
      titulo: "",
      descricao: "",
      data: "",
      local: ""
    });
  };

  const handleSubmitReuniao = async (e) => {
    e.preventDefault();
    
    if (!formDataReuniao.titulo || !formDataReuniao.data) {
      alert("Por favor, preencha título e data");
      return;
    }

    if (!organizacao) return;

    setIsSubmittingReuniao(true);

    try {
      if (editingReuniao) {
        // Editar reunião
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reunioes/${editingReuniao.id}`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            titulo: formDataReuniao.titulo,
            descricao: formDataReuniao.descricao,
            data: formDataReuniao.data,
            local: formDataReuniao.local
          })
        });
        await handleApiError(response, router);

        // Recarregar dados da organização
        const orgData = await fetchOrganizacaoData(organizacao.name || organizacao.nome);
        setOrganizacao(orgData);
        alert("Reunião editada com sucesso!");
      } else {
        // Criar reunião
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reunioes`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            titulo: formDataReuniao.titulo,
            descricao: formDataReuniao.descricao,
            data: formDataReuniao.data,
            local: formDataReuniao.local,
            entidade: { name: organizacao.name || organizacao.nome }
          })
        });
        await handleApiError(response, router);

        // Recarregar dados da organização
        const orgData = await fetchOrganizacaoData(organizacao.name || organizacao.nome);
        setOrganizacao(orgData);
        alert("Reunião criada com sucesso!");
      }

      handleCloseModalReuniao();
    } catch (error) {
      console.error("Erro ao salvar reunião:", error);
      alert("Erro ao salvar reunião. Tente novamente.");
    } finally {
      setIsSubmittingReuniao(false);
    }
  };

  const handleExcluirReuniao = async (reuniao) => {
    if (!confirm(`Deseja realmente excluir a reunião "${reuniao.nome}"?`)) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reunioes/${reuniao.id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      await handleApiError(response, router);

      // Recarregar dados da organização
      const orgData = await fetchOrganizacaoData(organizacao.name || organizacao.nome);
      setOrganizacao(orgData);
      alert("Reunião excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir reunião:", error);
      alert("Erro ao excluir reunião. Tente novamente.");
    }
  };

  if (!organizacao) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#b53b18] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[#6d4b35]">Carregando...</p>
        </div>
      </div>
    );
  }

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
      <Header />

      {/* Conteúdo Principal */}
      <main className="relative z-10 pt-10 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header da Organização */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => router.back()}
                className="
                  w-10 h-10
                  flex items-center justify-center
                  text-[#6d4b35] hover:text-[#b53b18]
                  hover:bg-[rgba(181,59,24,0.1)]
                  rounded-lg
                  transition-all
                "
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-4xl md:text-5xl font-display tracking-wide text-[#3a2418] mb-2">
                  {organizacao.name || organizacao.nome}
                </h1>
                <span className="
                  inline-block px-4 py-1
                  text-sm font-medium
                  text-[#b53b18]
                  bg-[rgba(255,122,45,0.15)]
                  rounded-full
                  border border-[rgba(181,59,24,0.2)]
                ">
                  {organizacao.nicho}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Seção de Reuniões */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display text-[#3a2418]">Reuniões</h2>
                <button
                  onClick={() => handleOpenModalReuniao()}
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
                  title="Adicionar Reunião"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              {organizacao.eventos.length === 0 ? (
                <div className="text-center py-12 bg-[rgba(255,255,255,0.5)] rounded-2xl border border-[#e2c6a4]">
                  <p className="text-[#6d4b35]">Nenhuma reunião cadastrada para esta organização</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {organizacao.eventos.map((evento) => (
                    <div
                      key={evento.id}
                      className="
                        rounded-2xl p-6
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
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-display text-[#3a2418]">{evento.nome}</h3>
                      <div className="flex items-center gap-2">
                        <span className="
                          text-xs font-medium
                          text-[#b53b18]
                          bg-[rgba(255,122,45,0.15)]
                          px-2 py-1
                          rounded-full
                        ">
                          {new Date(evento.data).toLocaleDateString('pt-BR')}
                        </span>
                        <button
                          onClick={() => handleOpenModalReuniao(evento)}
                          className="
                            w-8 h-8
                            flex items-center justify-center
                            text-[#6d4b35] hover:text-[#b53b18]
                            hover:bg-[rgba(181,59,24,0.1)]
                            rounded-lg
                            transition-all
                          "
                          title="Editar Reunião"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleExcluirReuniao(evento)}
                          className="
                            w-8 h-8
                            flex items-center justify-center
                            text-[#b53b18] hover:text-white
                            hover:bg-[#b53b18]
                            rounded-lg
                            transition-all
                          "
                          title="Excluir Reunião"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-[#6d4b35] mb-2">{evento.descricao}</p>
                    <p className="text-xs text-[#6d4b35]">
                      <span className="font-medium">Local:</span> {evento.local}
                    </p>
                  </div>
                  ))}
                </div>
              )}
            </div>
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

      {/* Modal de Criar/Editar Reunião */}
      {isModalReuniaoOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          style={{ backdropFilter: 'blur(8px)' }}
          onClick={handleCloseModalReuniao}
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
              onClick={handleCloseModalReuniao}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#6d4b35] hover:text-[#b53b18] hover:bg-[rgba(181,59,24,0.1)] rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Título do modal */}
            <h2 className="text-3xl font-display text-[#3a2418] mb-6">
              {editingReuniao ? "Editar Reunião" : "Adicionar Reunião"}
            </h2>

            {/* Formulário */}
            <form onSubmit={handleSubmitReuniao} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#3a2418] mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={formDataReuniao.titulo}
                  onChange={handleInputChangeReuniao}
                  required
                  className="
                    w-full px-4 py-2
                    bg-white
                    border border-[rgba(181,59,24,0.2)]
                    rounded-lg
                    text-[#3a2418]
                    focus:outline-none focus:ring-2 focus:ring-[#b53b18] focus:border-transparent
                  "
                  placeholder="Ex: Reunião de Planejamento"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3a2418] mb-2">
                  Descrição
                </label>
                <textarea
                  name="descricao"
                  value={formDataReuniao.descricao}
                  onChange={handleInputChangeReuniao}
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
                  placeholder="Descrição da reunião..."
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
                    value={formDataReuniao.data}
                    onChange={handleInputChangeReuniao}
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
                    value={formDataReuniao.local}
                    onChange={handleInputChangeReuniao}
                    className="
                      w-full px-4 py-2
                      bg-white
                      border border-[rgba(181,59,24,0.2)]
                      rounded-lg
                      text-[#3a2418]
                      focus:outline-none focus:ring-2 focus:ring-[#b53b18] focus:border-transparent
                    "
                    placeholder="Ex: Sala 301"
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-4 pt-4">
                <DecoButton
                  type="submit"
                  disabled={isSubmittingReuniao}
                  className="flex-1"
                >
                  {isSubmittingReuniao ? "Salvando..." : editingReuniao ? "Salvar Alterações" : "Criar Reunião"}
                </DecoButton>
                <button
                  type="button"
                  onClick={handleCloseModalReuniao}
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
    </div>
  );
}

