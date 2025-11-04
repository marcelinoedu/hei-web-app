import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import DecoButton from "@/components/DecoButton";

export default function DetalhesOrganizacao() {
  const router = useRouter();
  const { nome } = router.query;
  const [organizacao, setOrganizacao] = useState(null);
  const [isModalAlunoOpen, setIsModalAlunoOpen] = useState(false);
  const [editingAluno, setEditingAluno] = useState(null);
  const [formDataAluno, setFormDataAluno] = useState({
    nome: "",
    email: "",
    cpf: "",
    semestre: "",
    celular: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalReuniaoOpen, setIsModalReuniaoOpen] = useState(false);
  const [editingReuniao, setEditingReuniao] = useState(null);
  const [formDataReuniao, setFormDataReuniao] = useState({
    titulo: "",
    descricao: "",
    data: "",
    local: ""
  });
  const [isSubmittingReuniao, setIsSubmittingReuniao] = useState(false);

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
            descricao: "Competição de programação com 48 horas de duração. Desenvolva soluções inovadoras com sua equipe e concorra a prêmios incríveis.",
            data: "2024-12-15",
            local: "Campus Insper - Sala 301"
          },
          {
            id: 2,
            nome: "Workshop de Machine Learning",
            descricao: "Aprenda os fundamentos de ML com casos práticos. Traga seu notebook e participe de exercícios hands-on.",
            data: "2024-12-20",
            local: "Campus Insper - Laboratório 2"
          },
          {
            id: 3,
            nome: "Tech Talk: Inteligência Artificial",
            descricao: "Palestra sobre as tendências atuais em IA com especialistas da indústria. Networking após o evento.",
            data: "2025-01-10",
            local: "Campus Insper - Auditório"
          },
          {
            id: 4,
            nome: "Maratona de Programação",
            descricao: "Desafie-se em problemas de algoritmos e estruturas de dados. Aberto para todos os níveis.",
            data: "2025-01-25",
            local: "Campus Insper - Laboratório de Informática"
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
            id: 5,
            nome: "Feira de Projetos de Engenharia",
            descricao: "Apresentação de projetos inovadores dos estudantes. Venha conhecer soluções criativas em diversas áreas da engenharia.",
            data: "2025-01-15",
            local: "Campus Insper - Área Externa"
          },
          {
            id: 6,
            nome: "Workshop de Robótica",
            descricao: "Construa seu próprio robô e participe de competições. Materiais fornecidos pela organização.",
            data: "2025-02-05",
            local: "Campus Insper - Laboratório de Mecatrônica"
          },
          {
            id: 7,
            nome: "Visita Técnica: Fábrica de Automação",
            descricao: "Tour guiado em empresa de automação industrial. Vagas limitadas, inscrições antecipadas necessárias.",
            data: "2025-02-20",
            local: "A definir - Transporte fornecido"
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
            id: 8,
            nome: "Case Competition 2025",
            descricao: "Competição de casos de negócios entre equipes. Desenvolva estratégias e apresente para jurados da indústria.",
            data: "2025-02-01",
            local: "Campus Insper - Auditório Principal"
          },
          {
            id: 9,
            nome: "Networking Night: Carreiras em Negócios",
            descricao: "Conecte-se com profissionais e ex-alunos. Traga seu currículo e participe de conversas enriquecedoras.",
            data: "2025-02-15",
            local: "Campus Insper - Salão de Eventos"
          },
          {
            id: 10,
            nome: "Workshop: Pitch Perfect",
            descricao: "Aprenda a fazer apresentações impactantes. Treine seu pitch e receba feedback de investidores.",
            data: "2025-03-01",
            local: "Campus Insper - Sala de Reuniões 3"
          },
          {
            id: 11,
            nome: "Feira de Estágios e Trainees",
            descricao: "Conheça oportunidades de estágio e trainee em grandes empresas. Traga seu currículo impresso.",
            data: "2025-03-10",
            local: "Campus Insper - Área Comum"
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
      const nomeDecodificado = decodeURIComponent(nome);
      // TODO: Quando o backend estiver pronto, descomentar o fetch
      // Promise.all([
      //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/entidades/${encodeURIComponent(nomeDecodificado)}`).then(res => res.json()),
      //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/reunioes/entidade/${encodeURIComponent(nomeDecodificado)}`).then(res => res.json())
      // ])
      //   .then(([orgData, reunioesData]) => {
      //     setOrganizacao({
      //       ...orgData,
      //       eventos: reunioesData.map(r => ({
      //         id: r.id,
      //         nome: r.titulo,
      //         descricao: r.descricao || "",
      //         data: r.data,
      //         local: r.local || ""
      //       }))
      //     });
      //   })
      //   .catch(err => {
      //     console.error("Erro ao buscar dados:", err);
      //     setOrganizacao(getMockData(nomeDecodificado));
      //   });
      
      // Dados mock por enquanto
      setOrganizacao(getMockData(nomeDecodificado));
    }
  }, [nome]);

  const handleInputChangeAluno = (e) => {
    setFormDataAluno({
      ...formDataAluno,
      [e.target.name]: e.target.value
    });
  };

  const handleOpenModalAluno = (aluno = null) => {
    if (aluno) {
      setEditingAluno(aluno);
      setFormDataAluno({
        nome: aluno.nome || "",
        email: aluno.email || "",
        cpf: aluno.cpf || "",
        semestre: aluno.semestre || "",
        celular: aluno.celular || ""
      });
    } else {
      setEditingAluno(null);
      setFormDataAluno({
        nome: "",
        email: "",
        cpf: "",
        semestre: "",
        celular: ""
      });
    }
    setIsModalAlunoOpen(true);
  };

  const handleCloseModalAluno = () => {
    setIsModalAlunoOpen(false);
    setEditingAluno(null);
    setFormDataAluno({
      nome: "",
      email: "",
      cpf: "",
      semestre: "",
      celular: ""
    });
  };

  const handleSubmitAluno = async (e) => {
    e.preventDefault();
    
    if (!formDataAluno.nome.trim() || !formDataAluno.cpf.trim()) {
      alert("Por favor, preencha nome e CPF");
      return;
    }

    if (!organizacao) return;

    setIsSubmitting(true);

    try {
      if (editingAluno) {
        // Editar aluno
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/alunos/${editingAluno.cpf}`,
          {
            method: "PUT",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": "Bearer token" // TODO: Adicionar token real quando autenticação estiver pronta
            },
            body: JSON.stringify({
              nome: formDataAluno.nome,
              email: formDataAluno.email,
              cpf: formDataAluno.cpf,
              semestre: parseInt(formDataAluno.semestre) || 1,
              celular: formDataAluno.celular
            })
          }
        );
        if (!response.ok) throw new Error("Erro ao editar aluno");

        // Atualizar na lista local
        setOrganizacao({
          ...organizacao,
          alunos: organizacao.alunos.map(a => 
            a.id === editingAluno.id 
              ? { 
                  ...a,
                  nome: formDataAluno.nome,
                  email: formDataAluno.email,
                  cpf: formDataAluno.cpf,
                  semestre: parseInt(formDataAluno.semestre) || 1,
                  celular: formDataAluno.celular
                }
              : a
          )
        });
        alert("Aluno editado com sucesso!");
      } else {
        // Adicionar aluno
        // TODO: Quando o backend estiver pronto, descomentar o fetch
        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_API_URL}/entidades/${encodeURIComponent(organizacao.nome)}/adicionar-aluno`,
        //   {
        //     method: "POST",
        //     headers: { 
        //       "Content-Type": "application/json",
        //       "Authorization": "Bearer token"
        //     },
        //     body: JSON.stringify({ nome: formDataAluno.nome })
        //   }
        // );
        // if (!response.ok) throw new Error("Erro ao adicionar aluno");

        // Mock: adicionar aluno à lista
        const novoAluno = {
          id: Date.now(),
          nome: formDataAluno.nome,
          email: formDataAluno.email || `${formDataAluno.nome.toLowerCase().replace(/\s+/g, '.')}@insper.edu.br`,
          cpf: formDataAluno.cpf,
          semestre: parseInt(formDataAluno.semestre) || 1,
          celular: formDataAluno.celular || "(11) 00000-0000",
          curso: { nome: "Curso" }
        };

        setOrganizacao({
          ...organizacao,
          alunos: [...organizacao.alunos, novoAluno]
        });
        alert("Aluno adicionado com sucesso!");
      }

      handleCloseModalAluno();
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
      alert("Erro ao salvar aluno. Tente novamente.");
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
      //   `${process.env.NEXT_PUBLIC_API_URL}/entidades/${encodeURIComponent(organizacao.nome)}/remover-aluno`,
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            titulo: formDataReuniao.titulo,
            descricao: formDataReuniao.descricao,
            data: formDataReuniao.data,
            local: formDataReuniao.local
          })
        });
        if (!response.ok) throw new Error("Erro ao editar reunião");

        // Atualizar na lista local
        setOrganizacao({
          ...organizacao,
          eventos: organizacao.eventos.map(e => 
            e.id === editingReuniao.id 
              ? { 
                  id: e.id,
                  nome: formDataReuniao.titulo,
                  descricao: formDataReuniao.descricao,
                  data: formDataReuniao.data,
                  local: formDataReuniao.local
                }
              : e
          )
        });
        alert("Reunião editada com sucesso!");
      } else {
        // Criar reunião
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reunioes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            titulo: formDataReuniao.titulo,
            descricao: formDataReuniao.descricao,
            data: formDataReuniao.data,
            local: formDataReuniao.local,
            entidade: { name: organizacao.nome }
          })
        });
        if (!response.ok) throw new Error("Erro ao criar reunião");
        const novaReuniao = await response.json();

        // Adicionar à lista local
        setOrganizacao({
          ...organizacao,
          eventos: [...organizacao.eventos, {
            id: novaReuniao.id,
            nome: novaReuniao.titulo,
            descricao: novaReuniao.descricao || "",
            data: novaReuniao.data,
            local: novaReuniao.local || ""
          }]
        });
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
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Erro ao excluir reunião");

      // Remover da lista local
      setOrganizacao({
        ...organizacao,
        eventos: organizacao.eventos.filter(e => e.id !== reuniao.id)
      });
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
                  onClick={() => handleOpenModalAluno()}
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
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModalAluno(aluno)}
                          className="
                            w-8 h-8
                            flex items-center justify-center
                            text-[#6d4b35] hover:text-[#b53b18]
                            hover:bg-[rgba(181,59,24,0.1)]
                            rounded-lg
                            transition-all
                          "
                          title="Editar Aluno"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
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

      {/* Modal de Adicionar/Editar Aluno */}
      {isModalAlunoOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          style={{ backdropFilter: 'blur(8px)' }}
          onClick={handleCloseModalAluno}
        >
          <div className="
            relative
            w-full max-w-lg
            rounded-2xl p-8
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
                  {editingAluno ? "Editar Aluno" : "Adicionar Aluno"}
                </h2>
                <button
                  onClick={handleCloseModalAluno}
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

              <form onSubmit={handleSubmitAluno} className="space-y-4">
                {/* Nome */}
                <div>
                  <label className="block text-sm font-medium text-[#3a2418] mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formDataAluno.nome}
                    onChange={handleInputChangeAluno}
                    required
                    className="
                      w-full px-4 py-2
                      bg-white
                      border border-[rgba(181,59,24,0.2)]
                      rounded-lg
                      text-[#3a2418]
                      focus:outline-none focus:ring-2 focus:ring-[#b53b18] focus:border-transparent
                    "
                    placeholder="Ex: João Silva"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#3a2418] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formDataAluno.email}
                    onChange={handleInputChangeAluno}
                    className="
                      w-full px-4 py-2
                      bg-white
                      border border-[rgba(181,59,24,0.2)]
                      rounded-lg
                      text-[#3a2418]
                      focus:outline-none focus:ring-2 focus:ring-[#b53b18] focus:border-transparent
                    "
                    placeholder="Ex: joao.silva@insper.edu.br"
                  />
                </div>

                {/* CPF */}
                <div>
                  <label className="block text-sm font-medium text-[#3a2418] mb-2">
                    CPF *
                  </label>
                  <input
                    type="text"
                    name="cpf"
                    value={formDataAluno.cpf}
                    onChange={handleInputChangeAluno}
                    required
                    className="
                      w-full px-4 py-2
                      bg-white
                      border border-[rgba(181,59,24,0.2)]
                      rounded-lg
                      text-[#3a2418]
                      focus:outline-none focus:ring-2 focus:ring-[#b53b18] focus:border-transparent
                    "
                    placeholder="Ex: 123.456.789-00"
                  />
                </div>

                {/* Semestre e Celular */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#3a2418] mb-2">
                      Semestre
                    </label>
                    <input
                      type="number"
                      name="semestre"
                      value={formDataAluno.semestre}
                      onChange={handleInputChangeAluno}
                      min="1"
                      max="10"
                      className="
                        w-full px-4 py-2
                        bg-white
                        border border-[rgba(181,59,24,0.2)]
                        rounded-lg
                        text-[#3a2418]
                        focus:outline-none focus:ring-2 focus:ring-[#b53b18] focus:border-transparent
                      "
                      placeholder="Ex: 5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#3a2418] mb-2">
                      Celular
                    </label>
                    <input
                      type="text"
                      name="celular"
                      value={formDataAluno.celular}
                      onChange={handleInputChangeAluno}
                      className="
                        w-full px-4 py-2
                        bg-white
                        border border-[rgba(181,59,24,0.2)]
                        rounded-lg
                        text-[#3a2418]
                        focus:outline-none focus:ring-2 focus:ring-[#b53b18] focus:border-transparent
                      "
                      placeholder="Ex: (11) 98765-4321"
                    />
                  </div>
                </div>

                {/* Botões */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModalAluno}
                    className="
                      flex-1
                      px-6 py-3
                      font-display text-sm tracking-wide
                      text-[#6d4b35]
                      bg-transparent
                      border-2 border-[rgba(181,59,24,0.3)]
                      rounded-xl
                      transition-all duration-300 ease-out
                      hover:bg-[rgba(181,59,24,0.1)]
                      focus:outline-none focus:ring-2 focus:ring-[#ff7a2d]/40
                    "
                  >
                    Cancelar
                  </button>
                  <DecoButton type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? "Salvando..." : editingAluno ? "Salvar Alterações" : "Adicionar"}
                  </DecoButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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

