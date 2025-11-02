import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import DecoButton from "@/components/DecoButton";

export default function DetalhesOrganizacao() {
  const router = useRouter();
  const { nome } = router.query;
  const [organizacao, setOrganizacao] = useState(null);
  const [isModalAlunoOpen, setIsModalAlunoOpen] = useState(false);
  const [nomeAluno, setNomeAluno] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para obter dados mock baseado no nome
  const getMockData = (nomeOrg) => {
    const mockData = {
      "Hei": {
        nome: "Hei",
        nicho: "Tecnologia",
        alunos: [
          {
            id: 1,
            nome: "João Silva",
            email: "joao.silva@insper.edu.br",
            cpf: "123.456.789-00",
            semestre: 5,
            celular: "(11) 98765-4321",
            curso: { nome: "Engenharia de Computação" }
          },
          {
            id: 2,
            nome: "Maria Santos",
            email: "maria.santos@insper.edu.br",
            cpf: "987.654.321-00",
            semestre: 3,
            celular: "(11) 91234-5678",
            curso: { nome: "Ciência da Computação" }
          },
          {
            id: 3,
            nome: "Pedro Oliveira",
            email: "pedro.oliveira@insper.edu.br",
            cpf: "456.789.123-00",
            semestre: 7,
            celular: "(11) 99876-5432",
            curso: { nome: "Engenharia de Software" }
          }
        ],
        eventos: [
          {
            id: 1,
            nome: "Hackathon Tech 2024",
            descricao: "Competição de programação com 48 horas de duração",
            data: "2024-12-15",
            local: "Campus Insper - Sala 301"
          },
          {
            id: 2,
            nome: "Workshop de Machine Learning",
            descricao: "Aprenda os fundamentos de ML com casos práticos",
            data: "2024-12-20",
            local: "Campus Insper - Laboratório 2"
          }
        ]
      },
      "Tech Society": {
        nome: "Tech Society",
        nicho: "Engenharia",
        alunos: [
          {
            id: 4,
            nome: "Ana Costa",
            email: "ana.costa@insper.edu.br",
            cpf: "111.222.333-44",
            semestre: 4,
            celular: "(11) 94444-5555",
            curso: { nome: "Engenharia Mecânica" }
          },
          {
            id: 5,
            nome: "Carlos Mendes",
            email: "carlos.mendes@insper.edu.br",
            cpf: "555.666.777-88",
            semestre: 6,
            celular: "(11) 96666-7777",
            curso: { nome: "Engenharia Elétrica" }
          }
        ],
        eventos: [
          {
            id: 4,
            nome: "Feira de Projetos de Engenharia",
            descricao: "Apresentação de projetos inovadores dos estudantes",
            data: "2025-01-15",
            local: "Campus Insper - Área Externa"
          }
        ]
      },
      "Business Club": {
        nome: "Business Club",
        nicho: "Negócios",
        alunos: [
          {
            id: 6,
            nome: "Fernanda Lima",
            email: "fernanda.lima@insper.edu.br",
            cpf: "999.888.777-66",
            semestre: 2,
            celular: "(11) 98888-9999",
            curso: { nome: "Administração" }
          }
        ],
        eventos: [
          {
            id: 5,
            nome: "Case Competition 2025",
            descricao: "Competição de casos de negócios entre equipes",
            data: "2025-02-01",
            local: "Campus Insper - Auditório Principal"
          }
        ]
      }
    };

    return mockData[nomeOrg] || {
      nome: nomeOrg,
      nicho: "Geral",
      alunos: [],
      eventos: []
    };
  };

  useEffect(() => {
    if (nome) {
      // TODO: Quando o backend estiver pronto, descomentar o fetch
      // fetch(`http://localhost:8080/entidades/${encodeURIComponent(nome)}`)
      //   .then(res => res.json())
      //   .then(data => setOrganizacao(data))
      //   .catch(err => {
      //     console.error("Erro ao buscar organização:", err);
      //     setOrganizacao(getMockData(nome));
      //   });
      
      // Dados mock por enquanto
      setOrganizacao(getMockData(decodeURIComponent(nome)));
    }
  }, [nome]);

  const handleAdicionarAluno = async (e) => {
    e.preventDefault();
    
    if (!nomeAluno.trim()) {
      alert("Por favor, informe o nome do aluno");
      return;
    }

    if (!organizacao) return;

    setIsSubmitting(true);

    try {
      // TODO: Quando o backend estiver pronto, descomentar o fetch
      // const response = await fetch(
      //   `http://localhost:8080/entidades/${encodeURIComponent(organizacao.nome)}/adicionar-aluno`,
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ nome: nomeAluno })
      //   }
      // );
      // if (!response.ok) throw new Error("Erro ao adicionar aluno");

      // Mock: adicionar aluno à lista
      const novoAluno = {
        id: Date.now(),
        nome: nomeAluno,
        email: `${nomeAluno.toLowerCase().replace(/\s+/g, '.')}@insper.edu.br`,
        cpf: "000.000.000-00",
        semestre: 1,
        celular: "(11) 00000-0000",
        curso: { nome: "Curso" }
      };

      setOrganizacao({
        ...organizacao,
        alunos: [...organizacao.alunos, novoAluno]
      });

      setIsModalAlunoOpen(false);
      setNomeAluno("");
      alert("Aluno adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar aluno:", error);
      alert("Erro ao adicionar aluno. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoverAluno = async (aluno) => {
    if (!organizacao) return;
    
    if (!confirm(`Deseja realmente remover ${aluno.nome} desta organização?`)) {
      return;
    }

    try {
      // TODO: Quando o backend estiver pronto, descomentar o fetch
      // const response = await fetch(
      //   `http://localhost:8080/entidades/${encodeURIComponent(organizacao.nome)}/remover-aluno`,
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ nome: aluno.nome })
      //   }
      // );
      // if (!response.ok) throw new Error("Erro ao remover aluno");

      // Mock: remover aluno da lista
      setOrganizacao({
        ...organizacao,
        alunos: organizacao.alunos.filter(a => a.id !== aluno.id)
      });

      alert("Aluno removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover aluno:", error);
      alert("Erro ao remover aluno. Tente novamente.");
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
      <header className="relative z-20 px-6 md:px-12 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/organizacoes" className="flex items-center gap-3">
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
                  {organizacao.nome}
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Seção de Alunos */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display text-[#3a2418]">Alunos</h2>
                <button
                  onClick={() => setIsModalAlunoOpen(true)}
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
                  title="Adicionar Aluno"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              {organizacao.alunos.length === 0 ? (
                <div className="text-center py-12 bg-[rgba(255,255,255,0.5)] rounded-2xl border border-[#e2c6a4]">
                  <p className="text-[#6d4b35]">Nenhum aluno cadastrado nesta organização</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {organizacao.alunos.map((aluno) => (
                    <div
                      key={aluno.id}
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
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-display text-[#3a2418]">{aluno.nome}</h3>
                      <button
                        onClick={() => handleRemoverAluno(aluno)}
                        className="
                          w-8 h-8
                          flex items-center justify-center
                          text-[#b53b18] hover:text-white
                          hover:bg-[#b53b18]
                          rounded-lg
                          transition-all
                        "
                        title="Remover Aluno"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="space-y-1 text-sm text-[#6d4b35]">
                      <p><span className="font-medium">Email:</span> {aluno.email}</p>
                      <p><span className="font-medium">Curso:</span> {aluno.curso.nome}</p>
                      <p><span className="font-medium">Semestre:</span> {aluno.semestre}º</p>
                      <p><span className="font-medium">Celular:</span> {aluno.celular}</p>
                    </div>
                  </div>
                  ))}
                </div>
              )}
            </div>

            {/* Seção de Eventos */}
            <div>
              <h2 className="text-2xl font-display text-[#3a2418] mb-6">Eventos</h2>
              {organizacao.eventos.length === 0 ? (
                <div className="text-center py-12 bg-[rgba(255,255,255,0.5)] rounded-2xl border border-[#e2c6a4]">
                  <p className="text-[#6d4b35]">Nenhum evento cadastrado para esta organização</p>
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
                      <span className="
                        text-xs font-medium
                        text-[#b53b18]
                        bg-[rgba(255,122,45,0.15)]
                        px-2 py-1
                        rounded-full
                      ">
                        {new Date(evento.data).toLocaleDateString('pt-BR')}
                      </span>
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

      {/* Modal de Adicionar Aluno */}
      {isModalAlunoOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          style={{ backdropFilter: 'blur(8px)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsModalAlunoOpen(false);
              setNomeAluno("");
            }
          }}
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
          }}
          onClick={(e) => e.stopPropagation()}
          >
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
                  Adicionar Aluno
                </h2>
                <button
                  onClick={() => {
                    setIsModalAlunoOpen(false);
                    setNomeAluno("");
                  }}
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

              <form onSubmit={handleAdicionarAluno} className="space-y-6">
                {/* Nome do Aluno */}
                <label className="block">
                  <span className="text-sm font-medium text-[#b53b18]">Nome do Aluno</span>
                  <input
                    type="text"
                    value={nomeAluno}
                    onChange={(e) => setNomeAluno(e.target.value)}
                    className="
                      mt-1 w-full rounded-md p-3 
                      bg-[rgba(255,255,255,0.75)] 
                      border border-[#e2c6a4]
                      text-[#3a2418]
                      placeholder-[#a88967]
                      focus:outline-none focus:ring-2 focus:ring-[#ff7a2d]/40
                      transition
                    "
                    placeholder="Ex: João Silva"
                    required
                  />
                </label>

                {/* Botões */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalAlunoOpen(false);
                      setNomeAluno("");
                    }}
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
                    {isSubmitting ? "Adicionando..." : "Adicionar"}
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

