import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { careerSuggestions } from "@/constants/career-data";
import { Dispatch, SetStateAction, useState } from "react";
import Header from "@/components/shared/Header";
import { CareerType } from "@/types/career";
import jobCodes from "@/constants/onet_riasec.json"; // Import job data
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
    readyDescription: "Answer 50 questions to identify your interests and get personalized career recommendations",
    startButton: "Start Test",
    searchTitle: "Find a Job Directly",
    searchDescription: "searchDescription",
    searchPlaceholder: "Search for a job...",
  },
  ru: {
    title: "Узнай, кем ты хочешь стать, вместе с Talpyn",
    description: "Пройди простой тест Холланда или посмотри, какие профессии бывают и чем они интересны",
    readyTitle: "Хочешь узнать, какая профессия тебе подходит?",
    readyDescription: "Пройди тест из 50 вопросов и получи советы, какие направления лучше всего подходят именно тебе!",
    startButton: "Начать тест",
    searchTitle: "Ищешь свою будущую профессию?",
    searchDescription: "Введи название или интерес и узнай всё важное о разных специальностях!",
    searchPlaceholder: "Найти работу...",
  },
  kz: {
    title: "Talpyn-мен бірге кім болғың келетінін анықта!",
    description: "Оңай Холланд тестін тапсырып, қандай мамандықтар бар және олар неге қызықты екенін көр.",
    readyTitle: "Қай мамандық саған жарайтынын білгің келе ме?",
    readyDescription: "50 сұрақтан тұратын тесті тапсырып, саған ең қолайлы бағыттар туралы кеңес ал!",
    startButton: "Тестті бастау",
    searchTitle: "Болашақ мамандығыңды іздеп жүрсің бе?",
    searchDescription: "Атын немесе қызығушылығыңды жаз да, әртүрлі мамандықтар туралы маңызды ақпарат ал!",
    searchPlaceholder: "Жұмыс іздеу...",
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();

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

  const getTranslatedText = (type: CareerType, field: 'title' | 'description') => {
    const key = `${field}_${selectedLanguage}`;
    return type[key as keyof CareerType] || type[field];
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    const jobArray = Object.values(jobCodes);
    const filtered = jobArray.filter((job) =>
      job.title.toLowerCase().includes(term.toLowerCase()) || // Search in English
      job.title_ru.toLowerCase().includes(term.toLowerCase()) || // Search in Russian
      job.title_kz.toLowerCase().includes(term.toLowerCase()) // Search in Kazakh
    );
    setFilteredJobs(filtered);
  };

  const handleJobClick = (id: string) => {
    navigate(`/job/${id}`);
  };

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

          {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Object.entries(careerSuggestions).map(([key, type]) => {
              const IconComponent = type.icon;
              return (
                <Card key={key} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-full ${type.color} flex items-center justify-center mb-3 mx-auto`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{getTranslatedText(type, 'title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {getTranslatedText(type, 'description')}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div> */}

        {/* Search Autocomplete */}
        <div className="container mx-auto px-0 py-8">
          <Card className="max-w-4xl mx-auto border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
              <CardTitle className="text-2xl">{t.searchTitle}</CardTitle>
              <CardDescription className="text-lg">
                {t.searchDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              {searchTerm && filteredJobs.length > 0 && (
                <ul className="border-t border-gray-200 mt-4 pt-4 max-h-60 overflow-y-auto">
                  {filteredJobs.map((job) => (
                    <li
                      key={job.id}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
                      onClick={() => handleJobClick(job.id)}
                    >
                      {job.title}
                    </li>
                  ))}
                </ul>
              )}
              {searchTerm && filteredJobs.length === 0 && (
                <div className="px-4 py-2 text-gray-500">No jobs found</div>
              )}
            </CardContent>
          </Card>
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
