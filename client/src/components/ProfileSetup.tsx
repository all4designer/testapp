import { useState } from "react";
import { Button } from "@/components/ui-scss/Button";
import { Input } from "@/components/ui-scss/Input";
import { Label } from "@/components/ui-scss/Label";
import { Card } from "@/components/ui-scss/Card";
import { Badge } from "@/components/ui-scss/Badge";
import { Upload } from "lucide-react";

interface ProfileSetupProps {
  onComplete?: () => void;
}

const interests = [
  "Музеи",
  "Природа",
  "Гастрономия",
  "Фестивали",
  "История",
  "Фотоспоты",
  "Архитектура",
  "Пляжи",
  "Рыбалка",
  "Казачья культура",
  "Винодельни",
  "Театры",
  "Парки",
  "Спорт",
  "Шоппинг",
  "Ночная жизнь",
  "Религиозные места",
  "Ремёсла",
  "Семейный отдых",
  "Экстрим"
];

export default function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile setup:", { firstName, lastName, selectedInterests });
    onComplete?.();
  };

  const initials = `${firstName?.[0] || "?"}${lastName?.[0] || ""}`;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <Card style={{ width: '100%', maxWidth: '42rem', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 300, marginBottom: '0.5rem' }} data-testid="text-setup-title">
            Расскажите о себе
          </h1>
          <p className="text-muted" data-testid="text-setup-subtitle">
            Это поможет нам создать идеальный маршрут для вас
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '6rem',
              height: '6rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(118, 182, 117, 0.1)',
              color: 'hsl(118, 52%, 50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 600
            }}>
              {initials}
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => console.log("Upload avatar clicked")}
              data-testid="button-upload-avatar"
            >
              <Upload style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
              Загрузить фото
            </Button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <Label htmlFor="firstName">Имя</Label>
              <Input
                id="firstName"
                placeholder="Иван"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                data-testid="input-first-name"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Фамилия</Label>
              <Input
                id="lastName"
                placeholder="Иванов"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                data-testid="input-last-name"
              />
            </div>
          </div>

          <div>
            <Label>Ваши интересы</Label>
            <p className="text-small text-muted" style={{ marginBottom: '1rem' }}>
              Выберите темы, которые вам интересны
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {interests.map((interest, index) => (
                <Badge
                  key={interest}
                  variant={selectedInterests.includes(interest) ? "primary" : "outline"}
                  hover
                  onClick={() => toggleInterest(interest)}
                  data-testid={`badge-interest-${index}`}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <Button type="submit" style={{ width: '100%' }} data-testid="button-save-profile">
            Сохранить и начать
          </Button>
        </form>
      </Card>
    </div>
  );
}
