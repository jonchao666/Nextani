import Layout from "@/components/layout/Layout";
import IsNotAuthenticated from "@/components/youPage/IsNotAuthenticated";
import IsAuthenticated from "@/components/youPage/IsAuthenticated";
import useAuthStatus from "@/hooks/useAuthStatus";
import EmailNotVerified from "@/components/youPage/EmailNotVerified";

export default function You() {
  const { user, loading } = useAuthStatus();

  if (loading) {
    return <div className="p-3">Please wait...</div>;
  }

  if (!user) {
    return (
      <Layout youPage={true}>
        <IsNotAuthenticated />
      </Layout>
    );
  }

  if (user && !user.emailVerified) {
    return (
      <Layout youPage={true}>
        <EmailNotVerified />
      </Layout>
    );
  }

  return (
    <Layout youPage={true}>
      <IsAuthenticated />
    </Layout>
  );
}
