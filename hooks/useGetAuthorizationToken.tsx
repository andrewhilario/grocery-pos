import { useSession } from "next-auth/react";

export default function useGetAuthorizationToken() {
  const { data: session } = useSession();

  const token = session?.token || localStorage.getItem("token") || "";

  if (!token) {
    console.error("No token found in session or localStorage");
  }

  return token;
}
