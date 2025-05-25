
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "@/constants/career-data";
import { calculateResults } from "@/utils/career-utils";
import LandingPage from "@/components/career/LandingPage";
import Questionnaire from "@/components/career/Questionnaire";
import ResultsPage from "@/components/career/ResultsPage";

const Index = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const handleAnswer = (questionId: number, rating: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: rating
    }));
  };

  const handleJobClick = (jobTitle: string) => {
    navigate(`/job/${encodeURIComponent(jobTitle)}`);
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(questions.length / 10);
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const resetTest = () => {
    setCurrentPage(0);
    setAnswers({});
    setShowResults(false);
    setTestStarted(false);
  };

  if (!testStarted) {
    return <LandingPage onStartTest={() => setTestStarted(true)} />;
  }

  if (showResults) {
    const results = calculateResults(answers, questions);
    return (
      <ResultsPage 
        results={results} 
        onJobClick={handleJobClick} 
        onResetTest={resetTest} 
      />
    );
  }

  return (
    <Questionnaire
      currentPage={currentPage}
      answers={answers}
      onAnswer={handleAnswer}
      onNextPage={handleNextPage}
      onPreviousPage={handlePreviousPage}
      onPageChange={setCurrentPage}
    />
  );
};

export default Index;
