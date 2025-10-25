import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui-scss/Button";
import { MapPin, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isLoggedIn = location !== "/" && location !== "/auth";

  return (
    <header className="header">
      <Link href="/" className="header__logo" data-testid="link-logo">
        <MapPin data-testid="icon-logo" />
        <span data-testid="text-logo">СУЕТА РНД</span>
      </Link>

      <nav className="header__nav" style={{ display: mobileMenuOpen ? 'none' : 'flex' }}>
        {isLoggedIn && (
          <>
            <Link href="/profile" data-testid="link-profile">
              <Button variant="ghost" size="sm">Профиль</Button>
            </Link>
            <Link href="/plan" data-testid="link-plan-route">
              <Button variant="ghost" size="sm">Маршруты</Button>
            </Link>
          </>
        )}
        
        {!isLoggedIn ? (
          <Link href="/auth" data-testid="link-auth">
            <Button variant="primary" data-testid="button-login">Войти</Button>
          </Link>
        ) : (
          <Link href="/profile" data-testid="link-profile-button">
            <Button size="icon" variant="ghost" data-testid="button-profile">
              <User />
            </Button>
          </Link>
        )}
      </nav>

      <button
        className="btn btn-ghost btn-icon"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        data-testid="button-mobile-menu"
        style={{ display: 'none' }}
      >
        {mobileMenuOpen ? <X /> : <Menu />}
      </button>

      {mobileMenuOpen && (
        <div className="header__mobile-menu" style={{ display: 'block', padding: '1rem', position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'var(--card-background)', borderTop: '1px solid var(--card-border)' }}>
          {isLoggedIn && (
            <>
              <Link href="/profile" data-testid="link-mobile-profile">
                <Button variant="ghost" style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '0.5rem' }}>Профиль</Button>
              </Link>
              <Link href="/plan" data-testid="link-mobile-plan">
                <Button variant="ghost" style={{ width: '100%', justifyContent: 'flex-start' }}>Маршруты</Button>
              </Link>
            </>
          )}
          {!isLoggedIn && (
            <Link href="/auth" data-testid="link-mobile-auth">
              <Button variant="primary" style={{ width: '100%' }} data-testid="button-mobile-login">Войти</Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
