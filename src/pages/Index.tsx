import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { calculateResults } from "@/utils/career-utils";
import LandingPage from "@/components/career/LandingPage";
import Questionnaire from "@/components/career/Questionnaire";
import ResultsPage from "@/components/career/ResultsPage";
import { createQuestions } from "@/utils/questions-utils.ts";

// Import QUESTIONS_PER_PAGE
import { QUESTIONS_PER_PAGE } from "@/constants/career-data";

const Index = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  // Add state for language and type selection
  const [selectedLanguage, setSelectedLanguage] = useState<'ru' | 'kz'>('ru'); // Default to Russian
  const [selectedType, setSelectedType] = useState<'primary' | 'secondary'>('secondary'); // Default to Secondary

  // Create the questions array from preferencesData using the provided mapping and selected language/type
  const questions = useMemo(() => createQuestions(selectedType, selectedLanguage), [selectedLanguage, selectedType]); // Re-run memoization when language or type changes

  const handleAnswer = (questionId: number, rating: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: rating
    }));
  };

  const handleJobClick = (jobId: string) => {
    navigate(`/job/${encodeURIComponent(jobId)}`);
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
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
    // Reset language and type to defaults or keep current?
    // Keeping current for now: setSelectedLanguage('ru'); setSelectedType('secondary');
  };

  // Add resetToMain function
  const resetToMain = () => {
    setCurrentPage(0);
    setAnswers({});
    setShowResults(false);
    setTestStarted(false);
  };

  if (!testStarted) {
    return (
      <LandingPage
        onStartTest={() => setTestStarted(true)}
        selectedLanguage={selectedLanguage}
        selectedType={selectedType}
        onLanguageChange={setSelectedLanguage}
        onTypeChange={setSelectedType}
        onResetToMain={resetToMain}
      />
    );
  }

  if (showResults) {
    const results = calculateResults(answers, questions);
    console.log("Calculated Results:", results); // Log the results to console
    return (
      <ResultsPage
        results={results}
        onJobClick={handleJobClick}
        onResetTest={resetTest}
        questions={questions} // Pass questions to ResultsPage
        selectedLanguage={selectedLanguage}
        selectedType={selectedType}
        onLanguageChange={setSelectedLanguage}
        onTypeChange={setSelectedType}
        onResetToMain={resetToMain}
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
      questions={questions} // Pass the new questions array
      selectedLanguage={selectedLanguage}
      selectedType={selectedType}
      onLanguageChange={setSelectedLanguage}
      onTypeChange={setSelectedType}
      onResetToMain={resetToMain}
    />
  );
};

export default Index;
