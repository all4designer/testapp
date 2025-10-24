import { useLocation } from "wouter";
import Header from "@/components/Header";
import ProfileSetup from "@/components/ProfileSetup";

export default function Setup() {
  const [, setLocation] = useLocation();

  const handleComplete = () => {
    setLocation("/plan");
  };

  return (
    <div className="min-h-screen">
      <Header />
      <ProfileSetup onComplete={handleComplete} />
    </div>
  );
}
