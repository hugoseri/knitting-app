import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "~/app/components/layout";
import { authProviders } from "~/config/auth-providers";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-2xl font-extrabold text-white">
            Your new favorite
          </h3>
          <h1 className="text-8xl font-extrabold text-white">
            Knitting <span className="text-[hsl(280,100%,70%)]">App</span>
          </h1>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AuthManager />
        </div>
      </div>
    </Layout>
  );
}

function AuthManager() {
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  const callbackUrl = router.query.callbackUrl as string | undefined;

  if (sessionData) {
    router.push("/dashboard");
  }

  if (status === "loading") {
    <Layout>
      <h3 className="text-2xl font-extrabold text-white">Loading...</h3>
    </Layout>;
  }

  const [loginLoading, setLoginLoading] = useState(false);

  const handleSignIn = async () => {
    setLoginLoading(true);
    try {
      await signIn(authProviders.google.id, {
        callbackUrl: callbackUrl ?? "/",
      });
      router.push("/dashboard");
    } catch (error) {
      router.push("/error");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white"></p>
      <button
        className="text-2xl rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={handleSignIn}
        disabled={loginLoading}
      >
        {loginLoading ? "Signing in..." : "Sign in"}
      </button>
    </div>
  );
}
