import Layout from "@/components/layout/Layout";
import { useSelector } from "react-redux";
import IsNotAuthenticated from "@/components/youPage/IsNotAuthenticated";
import IsAuthenticated from "@/components/youPage/isAuthenticated";

export default function You() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Layout youPage={true}>
      {isAuthenticated ? <IsAuthenticated /> : <IsNotAuthenticated />}
    </Layout>
  );
}
