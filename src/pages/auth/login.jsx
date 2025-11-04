import Link from "next/link";
import DecoButton from "@/components/DecoButton";

export default function LoginPage() {

  // fazer chamada para api de login
  // salvar token ou cookies

  return (
    <form className="space-y-6">
      {/* Campo de email */}
      <label className="block">
        <span className="text-sm font-medium text-[#b53b18]">Email</span>
        <input
          type="email"
          className="
            mt-1 w-full rounded-md p-3 
            bg-[rgba(255,255,255,0.75)] 
            border border-[#e2c6a4]
            text-[#3a2418]
            placeholder-[#a88967]
            focus:outline-none focus:ring-2 focus:ring-[#ff7a2d]/40
            transition
          "
          placeholder="seu@email.com"
        />
      </label>

      {/* Campo de senha + link de esqueci */}
      <div className="space-y-1">
        <label className="block">
          <span className="text-sm font-medium text-[#b53b18]">Senha</span>
          <input
            type="password"
            className="
              mt-1 w-full rounded-md p-3 
              bg-[rgba(255,255,255,0.75)] 
              border border-[#e2c6a4]
              text-[#3a2418]
              placeholder-[#a88967]
              focus:outline-none focus:ring-2 focus:ring-[#ff7a2d]/40
              transition
            "
            placeholder="••••••••"
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
      <DecoButton type="submit" className="w-full">
        Entrar
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
