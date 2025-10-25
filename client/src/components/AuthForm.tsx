import { useState } from "react";
import { Button } from "@/components/ui-scss/Button";
import { Input } from "@/components/ui-scss/Input";
import { Label } from "@/components/ui-scss/Label";
import { Card } from "@/components/ui-scss/Card";

interface AuthFormProps {
  onSuccess?: () => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", { loginEmail, loginPassword });
    onSuccess?.();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register submitted:", { registerEmail, registerPassword, confirmPassword });
    onSuccess?.();
  };

  return (
    <div className="auth-form">
      <Card className="auth-form__container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 300, marginBottom: '0.5rem' }} data-testid="text-auth-title">
            Добро пожаловать
          </h1>
          <p className="text-muted" data-testid="text-auth-subtitle">
            Начните планировать ваши путешествия
          </p>
        </div>

        <div className="auth-form__tabs">
          <div className="auth-form__tab-list">
            <button
              type="button"
              className={`auth-form__tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
              data-testid="tab-login"
            >
              Войти
            </button>
            <button
              type="button"
              className={`auth-form__tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
              data-testid="tab-register"
            >
              Зарегистрироваться
            </button>
          </div>
        </div>

        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="auth-form__form">
            <div className="auth-form__field">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="your@email.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                data-testid="input-login-email"
              />
            </div>
            <div className="auth-form__field">
              <Label htmlFor="login-password">Пароль</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                data-testid="input-login-password"
              />
            </div>
            <Button type="submit" style={{ width: '100%' }} data-testid="button-login-submit">
              Продолжить
            </Button>
          </form>
        )}

        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="auth-form__form">
            <div className="auth-form__field">
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="your@email.com"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
                data-testid="input-register-email"
              />
            </div>
            <div className="auth-form__field">
              <Label htmlFor="register-password">Пароль</Label>
              <Input
                id="register-password"
                type="password"
                placeholder="••••••••"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
                data-testid="input-register-password"
              />
            </div>
            <div className="auth-form__field">
              <Label htmlFor="confirm-password">Подтвердите пароль</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                data-testid="input-confirm-password"
              />
            </div>
            <Button type="submit" style={{ width: '100%' }} data-testid="button-register-submit">
              Продолжить
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
