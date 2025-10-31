import "../styles/globals.css";
import AuthLayout from "@/components/AuthLayout";

export default function MyApp({ Component, pageProps, router }) {
  const isAuthRoute = router.pathname.startsWith("/auth");

  if (isAuthRoute) {
    return (
      <AuthLayout>
        <Component {...pageProps} />
      </AuthLayout>
    );
  }

  return <Component {...pageProps} />;
}
