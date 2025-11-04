import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import DecoButton from "@/components/DecoButton";
import { login } from "@/utils/auth";

export default function LoginPage() {
  const router = useRouter();
  
  // Estados para os campos do formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Função que será chamada quando o formulário for submetido
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de submit do form
    
    // Limpar erro anterior
    setError("");
    
    // Validação básica
    if (!email.trim() || !password.trim()) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);

    try {
      // Chama a função de login que criamos
      await login(email, password);
      
      // Se chegou aqui, login foi bem-sucedido
      // Redireciona para a rota original ou para organizações
      const redirectPath = router.query.redirect || "/organizacoes";
      router.push(redirectPath);
    } catch (error) {
      // Se deu erro, mostra mensagem para o usuário
      setError(error.message || "Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Mensagem de erro */}
      {error && (
        <div className="
          p-3 rounded-md
          bg-red-50 border border-red-200
          text-red-700 text-sm
        ">
          {error}
        </div>
      )}

      {/* Campo de email */}
      <label className="block">
        <span className="text-sm font-medium text-[#b53b18]">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="
            mt-1 w-full rounded-md p-3 
            bg-[rgba(255,255,255,0.75)] 
            border border-[#e2c6a4]
            text-[#3a2418]
            placeholder-[#a88967]
            focus:outline-none focus:ring-2 focus:ring-[#ff7a2d]/40
            transition
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          placeholder="seu@email.com"
          required
        />
      </label>

      {/* Campo de senha + link de esqueci */}
      <div className="space-y-1">
        <label className="block">
          <span className="text-sm font-medium text-[#b53b18]">Senha</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="
              mt-1 w-full rounded-md p-3 
              bg-[rgba(255,255,255,0.75)] 
              border border-[#e2c6a4]
              text-[#3a2418]
              placeholder-[#a88967]
              focus:outline-none focus:ring-2 focus:ring-[#ff7a2d]/40
              transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            placeholder="••••••••"
            required
          />
        </label>

        {/* Link de esqueci senha */}
        <div className="text-right">
          <Link
            href="/auth/forgot"
            className="
              text-sm font-medium text-[#b53b18] 
              hover:text-[#ff7a2d] 
              transition-colors 
              underline-offset-2 hover:underline
            "
          >
            Esqueci minha senha
          </Link>
        </div>
      </div>

      {/* Botão principal */}
      <DecoButton type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Entrando..." : "Entrar"}
      </DecoButton>

      {/* Divider / rodapé */}
      <div className="text-center pt-2">
        <span className="text-sm text-[#6d4b35]">
          Ainda não tem uma conta?{" "}
          <Link
            href="/auth/register"
            className="
              text-[#b53b18] font-medium 
              hover:text-[#ff7a2d] 
              transition-colors underline-offset-2 hover:underline
            "
          >
            Criar conta
          </Link>
        </span>
      </div>
    </form>
  );
}
