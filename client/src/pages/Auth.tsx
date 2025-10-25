import { useLocation } from "wouter";
import Header from "@/components/Header";
import AuthForm from "@/components/AuthForm";

export default function Auth() {
  const [, setLocation] = useLocation();

  const handleSuccess = () => {
    setLocation("/setup");
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      <AuthForm onSuccess={handleSuccess} />
    </div>
  );
}
