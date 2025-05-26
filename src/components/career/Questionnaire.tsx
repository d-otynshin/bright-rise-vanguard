import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { ArrowRight } from "lucide-react";
import { QUESTIONS_PER_PAGE } from "@/constants/career-data";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question } from "@/types/career";
import { Dispatch, SetStateAction } from "react";
import Header from "@/components/shared/Header";

interface QuestionnaireProps {
  currentPage: number;
  answers: { [key: number]: number };
  onAnswer: (questionId: number, rating: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onPageChange: (page: number) => void;
  questions?: Question[];
  selectedLanguage: 'ru' | 'kz';
  selectedType: 'primary' | 'secondary';
  onLanguageChange: Dispatch<SetStateAction<'ru' | 'kz'>>;
  onTypeChange: Dispatch<SetStateAction<'primary' | 'secondary'>>;
  onResetToMain: () => void;
}

const translations = {
  en: {
    pageInfo: (currentPage: number, totalPages: number) => `Page ${currentPage} of ${totalPages}`,
    rateDescription: "Rate each statement (1 = Strongly Disagree, 5 = Strongly Agree)",
    questionHeader: "Question",
    stronglyDisagree: "Strongly Disagree",
    stronglyAgree: "Strongly Agree",
    previousButton: "Previous",
    nextButton: "Next",
    viewResultsButton: "View Results",
  },
  ru: {
    pageInfo: (currentPage: number, totalPages: number) => `Страница ${currentPage} из ${totalPages}`,
    rateDescription: "Оцените каждое утверждение (1 = Совершенно не согласен, 5 = Полностью согласен)",
    questionHeader: "Вопрос",
    stronglyDisagree: "Совершенно не согласен",
    stronglyAgree: "Полностью согласен",
    previousButton: "Назад",
    nextButton: "Далее",
    viewResultsButton: "Посмотреть результаты",
  },
  kz: {
    pageInfo: (currentPage: number, totalPages: number) => `${currentPage} беті ${totalPages} ішінен`,
    rateDescription: "Әр тұжырымды бағалаңыз (1 = Мүлдем келіспеймін, 5 = Толықтай келісемін)",
    questionHeader: "Сұрақ",
    stronglyDisagree: "Мүлдем келіспеймін",
    stronglyAgree: "Толықтай келісемін",
    previousButton: "Алдыңғы",
    nextButton: "Келесі",
    viewResultsButton: "Нәтижелерді көру",
  },
};

const Questionnaire = ({ 
  currentPage, 
  answers, 
  onAnswer, 
  onNextPage, 
  onPreviousPage, 
  onPageChange,
  questions = [],
  selectedLanguage,
  selectedType,
  onLanguageChange,
  onTypeChange,
  onResetToMain
}: QuestionnaireProps) => {
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const currentQuestions = questions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value as 'ru' | 'kz';
    onLanguageChange(lang);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value as 'primary' | 'secondary';
    onTypeChange(type);
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  const canProceed = () => {
    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const endIndex = Math.min((currentPage + 1) * QUESTIONS_PER_PAGE, questions.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      if (!answers[questions[i].id]) {
        return false;
      }
    }
    return true;
  };

  const progress = (getAnsweredCount() / questions.length) * 100;

  const t = translations[selectedLanguage] || translations.en; // Fallback to English

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
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold text-gray-800">
                {t.pageInfo(currentPage + 1, totalPages)}
              </h2>
              <Badge variant="secondary">
                {getAnsweredCount()}/{questions.length} ({Math.round(progress)}%)
              </Badge>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>

          <Card className="border-0 shadow-md bg-white/90 backdrop-blur-sm mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">
                {t.questionHeader} {currentPage * QUESTIONS_PER_PAGE + 1} - {Math.min((currentPage + 1) * QUESTIONS_PER_PAGE, questions.length)}
              </CardTitle>
              <CardDescription className="text-sm">
                {t.rateDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 pr-6 text-base font-medium text-gray-600">{t.questionHeader}</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">1</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">2</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">3</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">4</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">5</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentQuestions.map((question, index) => (
                      <tr key={question.id} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-4 pr-6">
                          <span className="text-base font-medium text-gray-700">
                            {currentPage * QUESTIONS_PER_PAGE + index + 1}. {question.text}
                          </span>
                        </td>
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <td key={rating} className="py-4 px-2">
                            <RadioGroup
                              value={answers[question.id]?.toString()}
                              onValueChange={(value) => onAnswer(question.id, parseInt(value))}
                              className="flex justify-center"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value={rating.toString()}
                                  id={`q${question.id}-r${rating}`}
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor={`q${question.id}-r${rating}`}
                                  className={`flex items-center justify-center w-7 h-7 rounded-full border-2 cursor-pointer transition-all duration-200
                                    ${answers[question.id] === rating 
                                      ? 'border-blue-600 bg-blue-600' 
                                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                    }`}
                                >
                                  <div className={`w-2.5 h-2.5 rounded-full transition-all duration-200
                                    ${answers[question.id] === rating 
                                      ? 'bg-white' 
                                      : 'bg-transparent'
                                    }`}
                                  />
                                </Label>
                              </div>
                            </RadioGroup>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-4 px-2">
                <span>{t.stronglyDisagree}</span>
                <span>{t.stronglyAgree}</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <Button
              onClick={onPreviousPage}
              disabled={currentPage === 0}
              variant="outline"
              size="sm"
            >
              {t.previousButton}
            </Button>

            <Pagination>
              <PaginationContent>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => onPageChange(i)}
                      isActive={currentPage === i}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>
            </Pagination>

            <Button
              onClick={onNextPage}
              disabled={!canProceed()}
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {currentPage === totalPages - 1 ? t.viewResultsButton : t.nextButton}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
