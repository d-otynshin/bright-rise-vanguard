import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { calculateResults } from "@/utils/career-utils";
import LandingPage from "@/components/career/LandingPage";
import Questionnaire from "@/components/career/Questionnaire";
import ResultsPage from "@/components/career/ResultsPage";

// Import the preferences data
import preferencesData from "@/constants/preferences_localization.json copy";

// Import QUESTIONS_PER_PAGE
import { QUESTIONS_PER_PAGE } from "@/constants/career-data";

// Define the correct category mapping for the 50 secondary questions
const categoryMapping: { [key: string]: number[] } = {
  "realistic": [1, 7, 10, 13, 19, 27, 31, 37, 43, 49],
  "investigative": [2, 8, 14, 20, 26, 32, 38, 44, 50],
  "artistic": [3, 9, 15, 21, 33, 39, 45],
  "social": [4, 16, 22, 28, 34, 40, 46],
  "enterprising": [5, 11, 17, 23, 29, 35, 41, 47],
  "conventional": [6, 12, 18, 24, 30, 36, 42, 48]
};

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
  const questions = useMemo(() => {
    const questionsForTypeAndLang = preferencesData[selectedType]?.[selectedLanguage];
    if (!questionsForTypeAndLang) return [];

    return Object.keys(questionsForTypeAndLang).map(id => {
      const questionId = parseInt(id);
      let category: 'R' | 'A' | 'I' | 'S' | 'E' | 'C' = 'R'; // Default category, will be updated

      // Find the category for the current question ID based on the mapping (only for secondary)
      if (selectedType === 'secondary') {
          for (const catKey in categoryMapping) {
              const shortCat = catKey.charAt(0).toUpperCase() as 'R' | 'A' | 'I' | 'S' | 'E' | 'C';
              if (categoryMapping[catKey].includes(questionId)) {
                  category = shortCat;
                  break;
              }
          }
      } else {
          // TODO: Implement category mapping for primary questions if needed
          // For now, assigning 'C' as a placeholder for primary questions
           category = 'C';
      }


      return {
        id: questionId,
        text: questionsForTypeAndLang[id],
        category: category // Assign the determined category
      };
    });
  }, [selectedLanguage, selectedType]); // Re-run memoization when language or type changes

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
