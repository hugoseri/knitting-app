import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "~/app/components/layout";

export default function Dashboard() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const [signoutLoading, setSignoutLoading] = useState(false);

  const handleSignOut = async () => {
    setSignoutLoading(true);
    try {
      await signOut({
        redirectTo: "/",
      });
    } catch (error) {
      router.push("/error");
    } finally {
      setSignoutLoading(false);
    }
  };

  return (
    <Layout>
      <button
        className="text-sm ml-auto rounded-full bg-white/10 px-4 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={handleSignOut}
        disabled={signoutLoading}
      >
        Sign Out
      </button>
      <div className="flex flex-col items-center justify-center gap-12 w-full py-16">
        <h3 className="text-2xl font-extrabold text-white">
          Welcome {sessionData?.user?.name}!
        </h3>
      </div>
    </Layout>
  );
}
