import Link from "next/link";
import DecoButton from "@/components/DecoButton";

export default function RegisterPage() {
  return (
    <form className="space-y-6">
      {/* Nome */}
      <label className="block">
        <span className="text-sm font-medium text-[#b53b18]">Nome completo</span>
        <input
          type="text"
          className="
            mt-1 w-full rounded-md p-3 
            bg-[rgba(255,255,255,0.75)] 
            border border-[#e2c6a4]
            text-[#3a2418]
            placeholder-[#a88967]
            focus:outline-none focus:ring-2 focus:ring-[#ff7a2d]/40
            transition
          "
          placeholder="Seu nome"
        />
      </label>

      {/* Email */}
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

      {/* Senha */}
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
          placeholder="Crie uma senha"
        />
      </label>

      {/* Confirmar senha */}
      <label className="block">
        <span className="text-sm font-medium text-[#b53b18]">Confirmar senha</span>
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
          placeholder="Repita sua senha"
        />
      </label>

      <DecoButton type="submit" className="w-full">
        Criar conta
      </DecoButton>
      <div className="text-center pt-2">
        <span className="text-sm text-[#6d4b35]">
          Já tem uma conta?{" "}
          <Link
            href="/auth"
            className="
              text-[#b53b18] font-medium 
              hover:text-[#ff7a2d] 
              transition-colors underline-offset-2 hover:underline
            "
          >
            Fazer login
          </Link>
        </span>
      </div>
    </form>
  );
}
