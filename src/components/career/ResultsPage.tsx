
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Briefcase, Star, Award, GraduationCap, Rocket, BookOpen } from "lucide-react";
import { Results, Question } from "@/types/career";
import { getTopThreeTypes, getCategorizedMatches } from "@/utils/career-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, Dispatch, SetStateAction } from "react";
import Header from "@/components/shared/Header";
import { careerSuggestions } from "@/constants/career-data";
import jobCodes from "@/constants/onet_riasec.json";

interface ResultsPageProps {
  results: { topType: string, scores: Results };
  onJobClick: (jobId: string) => void;
  onResetTest: () => void;
  questions: Question[];
  selectedLanguage: 'ru' | 'kz';
  selectedType: 'primary' | 'secondary';
  onLanguageChange: Dispatch<SetStateAction<'ru' | 'kz'>>;
  onTypeChange: Dispatch<SetStateAction<'primary' | 'secondary'>>;
  onResetToMain: () => void;
}

const translations = {
  en: {
    mainTitle: "Your RAISEC Results",
    mainDescription: "Based on your responses, here are your top career interest areas",
    careersTitle: "Careers that fit your interests and preparation level",
    careersDescription: "Jobs organized by preparation level based on your top interest areas. Click on any job to learn more.",
    preparationLevels: {
      entry: { title: "Entry Level", description: "Minimal preparation required" },
      associate: { title: "Associate Level", description: "Some preparation required" },
      professional: { title: "Professional Level", description: "Moderate preparation required" },
      senior: { title: "Senior Level", description: "Advanced preparation required" },
      executive: { title: "Executive Level", description: "Extensive preparation required" },
    },
    resetButton: "Take Test Again",
    score: "Score",
    recommendedCareers: "Recommended Careers",
  },
  ru: {
    mainTitle: "Ваши результаты RAISEC",
    mainDescription: "На основе ваших ответов, вот ваши основные области профессиональных интересов",
    careersTitle: "Карьеры, соответствующие вашим интересам и уровню подготовки",
    careersDescription: "Вакансии, организованные по уровню подготовки на основе ваших основных областей интересов. Нажмите на любую вакансию, чтобы узнать больше.",
    preparationLevels: {
      entry: { title: "Начальный уровень", description: "Минимальная подготовка" },
      associate: { title: "Средний уровень", description: "Требуется некоторая подготовка" },
      professional: { title: "Профессиональный уровень", description: "Требуется умеренная подготовка" },
      senior: { title: "Высокий уровень", description: "Требуется продвинутая подготовка" },
      executive: { title: "Исполнительный уровень", description: "Требуется обширная подготовка" },
    },
    resetButton: "Пройти тест снова",
    score: "Балл",
    recommendedCareers: "Рекомендуемые профессии",
  },
};

const ResultsPage = ({
  results,
  onJobClick,
  onResetTest,
  questions,
  selectedLanguage,
  selectedType,
  onLanguageChange,
  onTypeChange,
  onResetToMain
}: ResultsPageProps) => {
  const topThree = getTopThreeTypes(results.scores);
  const categorizedJobs = getCategorizedMatches(results.scores, jobCodes);

  const maxScore = Math.max(...Object.values(results.scores));

  const [currentLanguage, setCurrentLanguage] = useState(selectedLanguage);
  const [currentType, setCurrentType] = useState(selectedType);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value as 'ru' | 'kz';
    setCurrentLanguage(lang);
    onLanguageChange(lang);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value as 'primary' | 'secondary';
    setCurrentType(type);
    onTypeChange(type);
  };

  const t = translations[selectedLanguage] || translations.en;

  const preparationLevels = [
    {
      id: "entry",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      jobs: categorizedJobs.bestMatch.filter(match => jobCodes[match.id]?.job_zone === 1).map(match => match.id),
      ...t.preparationLevels.entry,
    },
    {
      id: "associate",
      icon: GraduationCap,
      color: "from-green-500 to-green-600",
      jobs: categorizedJobs.bestMatch.filter(match => jobCodes[match.id]?.job_zone === 2).map(match => match.id),
      ...t.preparationLevels.associate,
    },
    {
      id: "professional",
      icon: Star,
      color: "from-purple-500 to-purple-600",
      jobs: categorizedJobs.bestMatch.filter(match => jobCodes[match.id]?.job_zone === 3).map(match => match.id),
      ...t.preparationLevels.professional,
    },
    {
      id: "senior",
      icon: Award,
      color: "from-orange-500 to-orange-600",
      jobs: categorizedJobs.bestMatch.filter(match => jobCodes[match.id]?.job_zone === 4).map(match => match.id),
      ...t.preparationLevels.senior,
    },
    {
      id: "executive",
      icon: Rocket,
      color: "from-red-500 to-red-600",
      jobs: categorizedJobs.bestMatch.filter(match => jobCodes[match.id]?.job_zone === 5).map(match => match.id),
      ...t.preparationLevels.executive,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header
        selectedLanguage={selectedLanguage}
        selectedType={selectedType}
        onLanguageChange={onLanguageChange}
        onTypeChange={onTypeChange}
        onResetToMain={onResetToMain}
        maxWidth="5xl"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {t.mainTitle}
            </h1>
            <p className="text-xl text-gray-600">
              {t.mainDescription}
            </p>
          </div>

          <div className="grid gap-6 mb-8">
            {Object.entries(results.scores).map(([type, score]) => {
              const typeInfo = careerSuggestions[type as keyof Results];
              const IconComponent = typeInfo.icon;
              const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
              const isTopThree = topThree.includes(type as keyof Results);

              return (
                <Card key={type} className={`border-0 shadow-lg ${isTopThree ? 'ring-2 ring-blue-500 shadow-xl' : ''}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full ${typeInfo.color} flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="text-xl">{typeInfo.title}</CardTitle>
                          <Badge variant={isTopThree ? "default" : "secondary"} className="text-sm">
                            {t.score}: {score}
                          </Badge>
                        </div>
                        <Progress value={percentage} className="h-2 mb-2" />
                        <CardDescription>{typeInfo.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  {isTopThree && typeInfo.careers && typeInfo.careers.length > 0 && (
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">{t.recommendedCareers}:</h4>
                        <div className="flex flex-wrap gap-2">
                          {typeInfo.careers.map((career) => (
                            <Badge key={career} variant="outline" className="text-xs">
                              {career}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <CardTitle className="text-xl">{t.careersTitle}</CardTitle>
              </div>
              <CardDescription className="text-base">
                {t.careersDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Tabs defaultValue="entry" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6 h-auto p-1 bg-gray-100">
                  {preparationLevels.map((level) => {
                    const IconComponent = level.icon;
                    return (
                      <TabsTrigger
                        key={level.id}
                        value={level.id}
                        className="flex flex-col items-center gap-2 py-4 px-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
                      >
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${level.color} flex items-center justify-center`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-medium leading-tight text-center">{level.title}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
                
                <div className="min-h-[400px]">
                  {preparationLevels.map((level) => (
                    <TabsContent key={level.id} value={level.id} className="mt-0 space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-sm px-3 py-1">
                          {level.description}
                        </Badge>
                      </div>

                      {/* Display Best Match jobs */}
                      {categorizedJobs.bestMatch.filter(match => jobCodes[match.id]?.job_zone === (preparationLevels.indexOf(level) + 1)).length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-800">Best Match</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {categorizedJobs.bestMatch
                              .filter(match => jobCodes[match.id]?.job_zone === (preparationLevels.indexOf(level) + 1))
                              .map((match) => (
                                <div
                                  key={match.id}
                                  onClick={() => onJobClick(match.id)}
                                  className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer group"
                                >
                                  <div className="flex items-center gap-3">
                                    <level.icon className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                                    <span className="font-medium text-sm text-gray-800 group-hover:text-gray-900">
                                      {selectedLanguage === 'ru'
                                        ? jobCodes[match.id]?.title_ru
                                        : selectedLanguage === 'kz'
                                          ? jobCodes[match.id]?.title_kz
                                          : jobCodes[match.id]?.title}
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Display Related Matches jobs */}
                      {categorizedJobs.relatedMatches.filter(match => jobCodes[match.id]?.job_zone === (preparationLevels.indexOf(level) + 1)).length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-800">Related Matches</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {categorizedJobs.relatedMatches
                              .filter(match => jobCodes[match.id]?.job_zone === (preparationLevels.indexOf(level) + 1))
                              .map((match) => (
                                <div
                                  key={match.id}
                                  onClick={() => onJobClick(match.id)}
                                  className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer group"
                                >
                                  <div className="flex items-center gap-3">
                                    <level.icon className="w-4 h-4 text-green-600 group-hover:text-green-700" />
                                    <span className="font-medium text-sm text-gray-800 group-hover:text-gray-900">
                                      {selectedLanguage === 'ru'
                                        ? jobCodes[match.id]?.title_ru
                                        : selectedLanguage === 'kz'
                                          ? jobCodes[match.id]?.title_kz
                                          : jobCodes[match.id]?.title}
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Display Other Matches jobs */}
                      {categorizedJobs.otherMatches.filter(match => jobCodes[match.id]?.job_zone === (preparationLevels.indexOf(level) + 1)).length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-800">Other Matches</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {categorizedJobs.otherMatches
                              .filter(match => jobCodes[match.id]?.job_zone === (preparationLevels.indexOf(level) + 1))
                              .map((match) => (
                                <div
                                  key={match.id}
                                  onClick={() => onJobClick(match.id)}
                                  className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer group"
                                >
                                  <div className="flex items-center gap-3">
                                    <level.icon className="w-4 h-4 text-gray-600 group-hover:text-gray-700" />
                                    <span className="font-medium text-sm text-gray-800 group-hover:text-gray-900">
                                      {selectedLanguage === 'ru'
                                        ? jobCodes[match.id]?.title_ru
                                        : selectedLanguage === 'kz'
                                          ? jobCodes[match.id]?.title_kz
                                          : jobCodes[match.id]?.title}
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={onResetTest}
              variant="outline"
              size="lg"
              className="px-8 py-3 text-base font-medium"
            >
              {t.resetButton}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
