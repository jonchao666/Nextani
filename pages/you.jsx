import Layout from "@/components/layout/Layout";
import { SignInIcon } from "@/icons";
import { Button, Link } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import IsNotAuthenticated from "@/components/you/IsNotAuthenticated";
import IsAuthenticated from "@/components/you/isAuthenticated";

export default function You() {
  const { resolvedTheme } = useTheme();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Layout>
      {isAuthenticated ? <IsAuthenticated /> : <IsNotAuthenticated />}
    </Layout>
  );
}
