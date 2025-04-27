import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TanstackProvider } from "@/components/tanstack-provider/provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import AuthProviders from "@/components/auth-provider/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grocery POS",
  description: "A complete grocery store management system"
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <TanstackProvider>
        <AuthProviders session={session}>
          <body className={inter.className}>{children}</body>
        </AuthProviders>
      </TanstackProvider>
    </html>
  );
}
