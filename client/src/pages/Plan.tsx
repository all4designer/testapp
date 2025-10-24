import { useLocation } from "wouter";
import Header from "@/components/Header";
import RoutePlanner from "@/components/RoutePlanner";

export default function Plan() {
  const [, setLocation] = useLocation();

  const handlePlanRoute = () => {
    setLocation("/result");
  };

  return (
    <div className="min-h-screen">
      <Header />
      <RoutePlanner onPlanRoute={handlePlanRoute} />
    </div>
  );
}
