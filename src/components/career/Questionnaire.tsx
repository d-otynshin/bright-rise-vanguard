
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { ArrowRight } from "lucide-react";
import { questions, QUESTIONS_PER_PAGE } from "@/constants/career-data";

interface QuestionnaireProps {
  currentPage: number;
  answers: { [key: number]: number };
  onAnswer: (questionId: number, rating: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onPageChange: (page: number) => void;
}

const Questionnaire = ({ 
  currentPage, 
  answers, 
  onAnswer, 
  onNextPage, 
  onPreviousPage, 
  onPageChange 
}: QuestionnaireProps) => {
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const currentQuestions = questions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Page {currentPage + 1} of {totalPages}
              </h2>
              <Badge variant="secondary">
                {getAnsweredCount()} of {questions.length} answered ({Math.round(progress)}%)
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl">
                Questions {currentPage * QUESTIONS_PER_PAGE + 1} - {Math.min((currentPage + 1) * QUESTIONS_PER_PAGE, questions.length)}
              </CardTitle>
              <CardDescription>
                Rate how much you agree with each statement (1 = Strongly Disagree, 5 = Strongly Agree)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {currentQuestions.map((question, index) => (
                  <div key={question.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium leading-relaxed mb-2">
                        {currentPage * QUESTIONS_PER_PAGE + index + 1}. {question.text}
                      </h3>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Button
                          key={rating}
                          onClick={() => onAnswer(question.id, rating)}
                          variant={answers[question.id] === rating ? "default" : "outline"}
                          size="lg"
                          className={`h-12 text-lg font-semibold transition-all duration-200 ${
                            answers[question.id] === rating 
                              ? "bg-blue-600 text-white" 
                              : "hover:bg-blue-50 hover:border-blue-300"
                          }`}
                        >
                          {rating}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-6 px-4">
                <span>Strongly Disagree</span>
                <span>Strongly Agree</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <Button
              onClick={onPreviousPage}
              disabled={currentPage === 0}
              variant="outline"
              size="lg"
            >
              Previous
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
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {currentPage === totalPages - 1 ? "View Results" : "Next"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
