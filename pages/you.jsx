import Layout from "@/components/layout/Layout";
import { SignInIcon } from "@/icons";
import { Button, Link } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import IsNotAuthenticated from "@/components/youPage/IsNotAuthenticated";
import IsAuthenticated from "@/components/youPage/isAuthenticated";

export default function You() {
  const { resolvedTheme } = useTheme();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Layout youPage={true}>
      {isAuthenticated ? <IsAuthenticated /> : <IsNotAuthenticated />}
    </Layout>
  );
}
