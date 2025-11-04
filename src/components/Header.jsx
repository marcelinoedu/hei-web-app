import Link from "next/link";
import { useRouter } from "next/router";
import { isAuthenticated, logout } from "@/utils/auth";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    if (confirm("Deseja realmente sair?")) {
      logout(router);
    }
  };

  return (
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
          <Link 
            href="/organizacoes" 
            className={`${
              router.pathname.startsWith("/organizacoes")
                ? "text-[#b53b18] font-medium"
                : "text-[#3a2418] hover:text-[#b53b18] transition-colors"
            }`}
          >
            Organizações
          </Link>
          
          {isAuthenticated() && (
            <button
              onClick={handleLogout}
              className="
                text-[#6d4b35] 
                hover:text-[#b53b18] 
                transition-colors 
                font-medium
                px-4 py-2
                rounded-lg
                hover:bg-[rgba(181,59,24,0.1)]
              "
            >
              Sair
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

