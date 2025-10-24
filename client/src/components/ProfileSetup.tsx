import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light mb-2" data-testid="text-setup-title">
            Расскажите о себе
          </h1>
          <p className="text-muted-foreground" data-testid="text-setup-subtitle">
            Это поможет нам создать идеальный маршрут для вас
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {firstName?.[0] || "?"}{lastName?.[0] || ""}
              </AvatarFallback>
            </Avatar>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => console.log("Upload avatar clicked")}
              data-testid="button-upload-avatar"
            >
              <Upload className="w-4 h-4 mr-2" />
              Загрузить фото
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
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
            <div className="space-y-2">
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

          <div className="space-y-4">
            <Label>Ваши интересы</Label>
            <p className="text-sm text-muted-foreground">
              Выберите темы, которые вам интересны
            </p>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <Badge
                  key={interest}
                  variant={selectedInterests.includes(interest) ? "default" : "outline"}
                  className="cursor-pointer hover-elevate active-elevate-2"
                  onClick={() => toggleInterest(interest)}
                  data-testid={`badge-interest-${index}`}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" data-testid="button-save-profile">
            Сохранить и начать
          </Button>
        </form>
      </Card>
    </div>
  );
}
