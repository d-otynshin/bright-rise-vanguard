import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { careerSuggestions } from "@/constants/career-data";
import { Dispatch, SetStateAction } from "react";
import Header from "@/components/shared/Header";

interface LandingPageProps {
  onStartTest: () => void;
  selectedLanguage: 'ru' | 'kz';
  selectedType: 'primary' | 'secondary';
  onLanguageChange: Dispatch<SetStateAction<'ru' | 'kz'>>;
  onTypeChange: Dispatch<SetStateAction<'primary' | 'secondary'>>;
  onResetToMain: () => void;
}

const translations = {
  en: {
    title: "RAISEC Career Interest Test",
    description: "Discover your career interests and find the perfect job match based on Holland's theory of career choice",
    readyTitle: "Ready to discover your career path?",
    readyDescription: "Answer 24 questions to identify your interests and get personalized career recommendations",
    startButton: "Start Test",
  },
  ru: {
    title: "Тест профессиональных интересов RAISEC",
    description: "Определите свои профессиональные интересы и найдите идеальную работу на основе теории выбора карьеры Холланда",
    readyTitle: "Готовы определить свой карьерный путь?",
    readyDescription: "Ответьте на 24 вопроса, чтобы выявить свои интересы и получить персональные рекомендации по карьере",
    startButton: "Начать тест",
  },
};

const LandingPage = ({
  onStartTest,
  selectedLanguage,
  selectedType,
  onLanguageChange,
  onTypeChange,
  onResetToMain
}: LandingPageProps) => {

  // Handlers for dropdown changes (local state not needed as Index manages it)
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value as 'ru' | 'kz';
    onLanguageChange(lang);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value as 'primary' | 'secondary';
    onTypeChange(type);
  };

  const t = translations[selectedLanguage] || translations.en; // Fallback to English

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header
        selectedLanguage={selectedLanguage}
        selectedType={selectedType}
        onLanguageChange={onLanguageChange}
        onTypeChange={onTypeChange}
        onResetToMain={onResetToMain}
        maxWidth="4xl"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Object.entries(careerSuggestions).map(([key, type]) => {
              const IconComponent = type.icon;
              // Note: careerSuggestions titles/descriptions are not translated here
              // This would require updating the career-data.ts structure
              return (
                <Card key={key} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-full ${type.color} flex items-center justify-center mb-3 mx-auto`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {type.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl">{t.readyTitle}</CardTitle>
              <CardDescription className="text-lg">
                {t.readyDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={onStartTest} 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
              >
                {t.startButton} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
