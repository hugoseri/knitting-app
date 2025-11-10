"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "./layout";

export default function ProtectedRouter({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center gap-12 w-full py-16">
          <h3 className="text-2xl font-extrabold text-white">Loading...</h3>
        </div>
      </Layout>
    );
  }

  return children;
}
