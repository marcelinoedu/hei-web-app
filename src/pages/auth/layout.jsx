import AuthLayout from "@/components/AuthLayout"; 

export const metadata = {
  title: "Entrar — Hub de Entidades",
};

export default function AuthPageLayout({ children }) {
  return <AuthLayout>{children}</AuthLayout>;
}
