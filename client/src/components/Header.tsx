import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isLoggedIn = location !== "/" && location !== "/auth";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-lg -ml-3">
            <MapPin className="w-6 h-6 text-primary" data-testid="icon-logo" />
            <span className="font-semibold text-lg" data-testid="text-logo">РостовМаршрут</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {isLoggedIn && (
              <>
                <Link href="/profile" data-testid="link-profile">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">Профиль</span>
                </Link>
                <Link href="/plan" data-testid="link-plan-route">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">Маршруты</span>
                </Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <Link href="/auth" data-testid="link-auth">
                <Button variant="default" data-testid="button-login">Войти</Button>
              </Link>
            ) : (
              <Link href="/profile" data-testid="link-profile-button">
                <Button size="icon" variant="ghost" data-testid="button-profile">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 hover-elevate active-elevate-2 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {isLoggedIn && (
              <>
                <Link href="/profile" data-testid="link-mobile-profile">
                  <div className="block px-4 py-2 text-sm hover-elevate active-elevate-2 rounded-lg">Профиль</div>
                </Link>
                <Link href="/plan" data-testid="link-mobile-plan">
                  <div className="block px-4 py-2 text-sm hover-elevate active-elevate-2 rounded-lg">Маршруты</div>
                </Link>
              </>
            )}
            {!isLoggedIn && (
              <Link href="/auth" data-testid="link-mobile-auth">
                <Button variant="default" className="w-full" data-testid="button-mobile-login">Войти</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
