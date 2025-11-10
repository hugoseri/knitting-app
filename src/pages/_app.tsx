import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Geist } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { useRouter } from "next/router";
import ProtectedRouter from "~/app/components/protected-route";

const geist = Geist({
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const isProtected = router.pathname.startsWith("/dashboard");

  return (
    <SessionProvider session={session}>
      <div className={geist.className}>
        {isProtected ? (
          <ProtectedRouter>
            <Component {...pageProps} />
          </ProtectedRouter>
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
