
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Search } from "lucide-react";
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
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.description}
            </p>
          </div>

          {/* Two cards in a row */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Search Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-left">{t.searchTitle}</CardTitle>
                </div>
                <CardDescription className="text-lg text-left">
                  {t.searchDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-left"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                {searchTerm && filteredJobs.length > 0 && (
                  <div className="border border-gray-200 rounded-lg mt-4 bg-white shadow-sm max-h-60 overflow-y-auto">
                    {filteredJobs.map((job) => (
                      <div
                        key={job.id}
                        className="px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-left transition-colors"
                        onClick={() => handleJobClick(job.id)}
                      >
                        <span className="text-gray-800 font-medium">
                          {selectedLanguage === 'ru'
                            ? job.title_ru || job.title
                            : selectedLanguage === 'kz'
                              ? job.title_kz || job.title
                              : job.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {searchTerm && filteredJobs.length === 0 && (
                  <div className="px-4 py-3 text-gray-500 border border-gray-200 rounded-lg bg-gray-50">
                    {selectedLanguage === 'ru' ? 'Работы не найдены' : selectedLanguage === 'kz' ? 'Жұмыс табылмады' : 'No jobs found'}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Test Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm h-fit">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-left">{t.readyTitle}</CardTitle>
                </div>
                <CardDescription className="text-lg text-left">
                  {t.readyDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Button 
                  onClick={onStartTest} 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                >
                  {t.startButton} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
