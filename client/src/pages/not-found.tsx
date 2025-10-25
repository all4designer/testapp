import { Card } from "@/components/ui-scss/Card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="not-found">
      <Card>
        <div className="not-found__content">
          <div className="not-found__header">
            <AlertCircle />
            <h1>404 Page Not Found</h1>
          </div>
          <p>Did you forget to add the page to the router?</p>
        </div>
      </Card>
    </div>
  );
}
