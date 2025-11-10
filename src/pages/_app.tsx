import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Geist } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { useRouter } from "next/router";
import RouteWrapper from "~/app/components/route-wrapper";

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
        <RouteWrapper authRequired={isProtected}>
          <Component {...pageProps} />
        </RouteWrapper>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
