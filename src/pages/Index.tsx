import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ArrowRight, Brain, Target, Users, Wrench, Palette, Calculator, Briefcase, Star, Award } from "lucide-react";

interface Question {
  id: number;
  text: string;
  category: 'R' | 'A' | 'I' | 'S' | 'E' | 'C';
}

interface Results {
  R: number;
  A: number;
  I: number;
  S: number;
  E: number;
  C: number;
}

const questions: Question[] = [
  { id: 1, text: "I enjoy working with tools and machinery", category: 'R' },
  { id: 2, text: "I like to create art, music, or write creatively", category: 'A' },
  { id: 3, text: "I enjoy solving complex problems and puzzles", category: 'I' },
  { id: 4, text: "I like helping people with their problems", category: 'S' },
  { id: 5, text: "I enjoy leading and persuading others", category: 'E' },
  { id: 6, text: "I like organizing data and working with numbers", category: 'C' },
  { id: 7, text: "I prefer working outdoors or with my hands", category: 'R' },
  { id: 8, text: "I enjoy expressing myself through creative mediums", category: 'A' },
  // { id: 9, text: "I like conducting research and experiments", category: 'I' },
  // { id: 10, text: "I enjoy teaching and mentoring others", category: 'S' },
  // { id: 11, text: "I like managing projects and people", category: 'E' },
  // { id: 12, text: "I prefer following detailed procedures and rules", category: 'C' },
  // { id: 13, text: "I enjoy building and fixing things", category: 'R' },
  // { id: 14, text: "I like performing or entertaining others", category: 'A' },
  // { id: 15, text: "I enjoy analyzing data and finding patterns", category: 'I' },
  // { id: 16, text: "I like counseling and supporting people", category: 'S' },
  // { id: 17, text: "I enjoy selling ideas or products", category: 'E' },
  // { id: 18, text: "I like keeping accurate records and files", category: 'C' },
  // { id: 19, text: "I prefer practical, hands-on work", category: 'R' },
  // { id: 20, text: "I enjoy designing and creating new things", category: 'A' },
  // { id: 21, text: "I like theoretical and abstract thinking", category: 'I' },
  // { id: 22, text: "I enjoy working in healthcare or social services", category: 'S' },
  // { id: 23, text: "I like taking risks and making deals", category: 'E' },
  // { id: 24, text: "I prefer structured and organized environments", category: 'C' }
];

const careerSuggestions = {
  R: {
    title: "Realistic",
    description: "Hands-on, practical work with tools, machines, and physical materials",
    icon: Wrench,
    color: "bg-gradient-to-r from-green-500 to-emerald-600",
    careers: ["Engineer", "Mechanic", "Carpenter", "Pilot", "Farmer", "Electrician"]
  },
  A: {
    title: "Artistic",
    description: "Creative expression and working with ideas, art, and design",
    icon: Palette,
    color: "bg-gradient-to-r from-purple-500 to-pink-600",
    careers: ["Artist", "Designer", "Writer", "Musician", "Actor", "Photographer"]
  },
  I: {
    title: "Investigative",
    description: "Research, analysis, and solving complex problems",
    icon: Brain,
    color: "bg-gradient-to-r from-blue-500 to-cyan-600",
    careers: ["Scientist", "Researcher", "Doctor", "Analyst", "Professor", "Psychologist"]
  },
  S: {
    title: "Social",
    description: "Helping, teaching, and working with people",
    icon: Users,
    color: "bg-gradient-to-r from-orange-500 to-red-600",
    careers: ["Teacher", "Counselor", "Nurse", "Social Worker", "Therapist", "Coach"]
  },
  E: {
    title: "Enterprising",
    description: "Leading, persuading, and managing for economic gain",
    icon: Target,
    color: "bg-gradient-to-r from-yellow-500 to-orange-600",
    careers: ["Manager", "Salesperson", "Entrepreneur", "Lawyer", "Executive", "Politician"]
  },
  C: {
    title: "Conventional",
    description: "Organizing, processing data, and following detailed procedures",
    icon: Calculator,
    color: "bg-gradient-to-r from-indigo-500 to-purple-600",
    careers: ["Accountant", "Administrator", "Banker", "Secretary", "Clerk", "Analyst"]
  }
};

const jobsByPreparation = {
  R: {
    bestFit: [
      { name: "Mechanical Engineer", zone: 5 },
      { name: "Civil Engineer", zone: 4 },
      { name: "Electrical Engineer", zone: 4 },
      { name: "Aerospace Engineer", zone: 5 },
      { name: "Industrial Engineer", zone: 4 },
      { name: "Agricultural Engineer", zone: 4 }
    ],
    greatFit: [
      { name: "Electrician", zone: 3 },
      { name: "Carpenter", zone: 2 },
      { name: "Plumber", zone: 3 },
      { name: "Automotive Technician", zone: 3 },
      { name: "Aircraft Mechanic", zone: 3 },
      { name: "Construction Manager", zone: 4 },
      { name: "Welder", zone: 2 },
      { name: "HVAC Technician", zone: 3 },
      { name: "Machinist", zone: 2 },
      { name: "Electronics Technician", zone: 3 }
    ]
  },
  A: {
    bestFit: [
      { name: "Art Director", zone: 4 },
      { name: "Creative Director", zone: 5 },
      { name: "Interior Designer", zone: 4 },
      { name: "Graphic Designer", zone: 3 },
      { name: "Film Director", zone: 5 },
      { name: "Music Producer", zone: 4 }
    ],
    greatFit: [
      { name: "Photographer", zone: 2 },
      { name: "Fashion Designer", zone: 3 },
      { name: "Animator", zone: 3 },
      { name: "Dance Instructor", zone: 2 },
      { name: "Museum Curator", zone: 4 },
      { name: "Theater Director", zone: 4 },
      { name: "Jewelry Designer", zone: 2 },
      { name: "Multimedia Artist", zone: 3 },
      { name: "Creative Writer", zone: 3 }
    ]
  },
  I: {
    bestFit: [
      { name: "Data Scientist", zone: 5 },
      { name: "Research Scientist", zone: 5 },
      { name: "Biomedical Engineer", zone: 5 },
      { name: "Medical Researcher", zone: 5 },
      { name: "Software Engineer", zone: 4 },
      { name: "Environmental Scientist", zone: 4 }
    ],
    greatFit: [
      { name: "Physicist", zone: 5 },
      { name: "Chemist", zone: 4 },
      { name: "Mathematician", zone: 5 },
      { name: "Biologist", zone: 4 },
      { name: "Geologist", zone: 4 },
      { name: "Astronomer", zone: 5 },
      { name: "Computer Systems Analyst", zone: 4 },
      { name: "Operations Research Analyst", zone: 4 },
      { name: "Statistician", zone: 4 }
    ]
  },
  S: {
    bestFit: [
      { name: "Clinical Psychologist", zone: 5 },
      { name: "Physical Therapist", zone: 5 },
      { name: "Occupational Therapist", zone: 5 },
      { name: "Speech Therapist", zone: 5 },
      { name: "School Counselor", zone: 4 },
      { name: "Social Worker", zone: 4 }
    ],
    greatFit: [
      { name: "Registered Nurse", zone: 4 },
      { name: "Special Education Teacher", zone: 4 },
      { name: "Community Health Worker", zone: 3 },
      { name: "Marriage Counselor", zone: 4 },
      { name: "Child Care Worker", zone: 2 },
      { name: "Mental Health Counselor", zone: 4 },
      { name: "Life Coach", zone: 3 }
    ]
  },
  E: {
    bestFit: [
      { name: "Business Manager", zone: 4 },
      { name: "Marketing Director", zone: 5 },
      { name: "Financial Advisor", zone: 4 },
      { name: "Investment Banker", zone: 5 },
      { name: "Business Consultant", zone: 5 },
      { name: "Operations Manager", zone: 4 }
    ],
    greatFit: [
      { name: "Sales Manager", zone: 4 },
      { name: "Real Estate Agent", zone: 3 },
      { name: "Project Manager", zone: 4 },
      { name: "Public Relations Manager", zone: 4 },
      { name: "Event Coordinator", zone: 3 },
      { name: "Restaurant Manager", zone: 3 },
      { name: "Insurance Sales Agent", zone: 3 }
    ]
  },
  C: {
    bestFit: [
      { name: "Financial Analyst", zone: 4 },
      { name: "Database Administrator", zone: 4 },
      { name: "Budget Analyst", zone: 4 },
      { name: "Credit Analyst", zone: 4 },
      { name: "Auditor", zone: 4 },
      { name: "Tax Preparer", zone: 3 }
    ],
    greatFit: [
      { name: "Accountant", zone: 3 },
      { name: "Administrative Assistant", zone: 2 },
      { name: "Bookkeeper", zone: 2 },
      { name: "Legal Secretary", zone: 3 },
      { name: "Medical Records Technician", zone: 2 },
      { name: "Quality Control Inspector", zone: 2 },
      { name: "Payroll Clerk", zone: 2 }
    ]
  }
};

const QUESTIONS_PER_PAGE = 5;

const Index = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [jobZone, setJobZone] = useState(5);

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const currentQuestions = questions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  const handleAnswer = (questionId: number, rating: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: rating
    }));
  };

  const handleNextPage = () => {
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

  const calculateResults = (): Results => {
    const results: Results = { R: 0, A: 0, I: 0, S: 0, E: 0, C: 0 };
    
    questions.forEach((question) => {
      if (answers[question.id]) {
        results[question.category] += answers[question.id];
      }
    });

    return results;
  };

  const getTopThreeTypes = (results: Results) => {
    return Object.entries(results)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([type]) => type as keyof Results);
  };

  const getCategorizedJobs = (results: Results) => {
    const topThree = getTopThreeTypes(results);
    const bestFit: { name: string; zone: number }[] = [];
    const greatFit: { name: string; zone: number }[] = [];

    topThree.forEach(type => {
      bestFit.push(...jobsByPreparation[type as keyof Results].bestFit);
      greatFit.push(...jobsByPreparation[type as keyof Results].greatFit);
    });

    return {
      bestFit: [...new Set(bestFit.map(j => JSON.stringify(j)))].map(j => JSON.parse(j)),
      greatFit: [...new Set(greatFit.map(j => JSON.stringify(j)))].map(j => JSON.parse(j))
    };
  };

  const resetTest = () => {
    setCurrentPage(0);
    setAnswers({});
    setShowResults(false);
    setTestStarted(false);
  };

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                RAISEC Career Interest Test
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover your career interests and find the perfect job match based on Holland's theory of career choice
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {Object.entries(careerSuggestions).map(([key, type]) => {
                const IconComponent = type.icon;
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
                <CardTitle className="text-2xl">Ready to discover your career path?</CardTitle>
                <CardDescription className="text-lg">
                  Answer 24 questions to identify your interests and get personalized career recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setTestStarted(true)} 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                >
                  Start Test <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const results = calculateResults();
    const topThree = getTopThreeTypes(results);
    const maxScore = Math.max(...Object.values(results));
    const categorizedJobs = getCategorizedJobs(results);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Your RAISEC Results
              </h1>
              <p className="text-xl text-gray-600">
                Based on your responses, here are your top career interest areas
              </p>
            </div>

            <div className="grid gap-6 mb-8">
              {Object.entries(results).map(([type, score]) => {
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
                              Score: {score}
                            </Badge>
                          </div>
                          <Progress value={percentage} className="h-2 mb-2" />
                          <CardDescription>{typeInfo.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    {isTopThree && (
                      <CardContent>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Recommended Careers:</h4>
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
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Careers that fit your interests and preparation level</CardTitle>
                </div>
                <CardDescription className="text-lg">
                  Jobs organized by preparation level based on your top interest areas
                </CardDescription>
                <div className="flex items-center gap-2 mt-4 justify-center">
                  {[1, 2, 3, 4, 5].map(zone => (
                    <button
                      key={zone}
                      onClick={() => setJobZone(zone)}
                      className={`px-4 py-2 rounded-full border-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        jobZone === zone
                          ? 'bg-blue-600 text-white border-blue-600 scale-110 shadow-lg'
                          : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      {zone}
                    </button>
                  ))}
                  <span className="ml-4 text-gray-500 font-medium">Job Zone {jobZone}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-600">Best fit</h3>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                      Higher preparation required
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categorizedJobs.bestFit.filter(job => job.zone === jobZone).slice(0, 10).map((job) => (
                      <div
                        key={job.name}
                        className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-200 hover:scale-105"
                      >
                        <div className="flex items-center gap-3">
                          <Star className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-gray-800">{job.name}</span>
                        </div>
                      </div>
                    ))}
                    {categorizedJobs.bestFit.filter(job => job.zone === jobZone).length === 0 && (
                      <div className="text-gray-400 italic">No careers found for this job zone.</div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-600">Great fit</h3>
                    <Badge variant="secondary" className="bg-green-50 text-green-700">
                      Moderate preparation required
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categorizedJobs.greatFit.filter(job => job.zone === jobZone).slice(0, 10).map((job) => (
                      <div
                        key={job.name}
                        className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-md transition-all duration-200 hover:scale-105"
                      >
                        <div className="flex items-center gap-3">
                          <Award className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-gray-800">{job.name}</span>
                        </div>
                      </div>
                    ))}
                    {categorizedJobs.greatFit.filter(job => job.zone === jobZone).length === 0 && (
                      <div className="text-gray-400 italic">No careers found for this job zone.</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button 
                onClick={resetTest} 
                variant="outline" 
                size="lg"
                className="px-8 py-4"
              >
                Take Test Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              {/* Larger Table-like Question Layout */}
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-2">
                  <thead>
                    <tr>
                      <th className="text-left text-sm font-semibold text-gray-600 px-4 py-2">#</th>
                      <th className="text-left text-sm font-semibold text-gray-600 px-4 py-2">Question</th>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <th key={rating} className="text-center text-sm font-semibold text-gray-600 px-4 py-2">{rating}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentQuestions.map((question, index) => {
                      const categoryColors = {
                        R: 'bg-green-50',
                        A: 'bg-purple-50',
                        I: 'bg-pink-50',
                        S: 'bg-indigo-50',
                        E: 'bg-orange-50',
                        C: 'bg-yellow-50',
                      };
                      return (
                        <tr key={question.id} className={`rounded-lg ${categoryColors[question.category]} transition-all`}>
                          <td className="text-sm text-gray-400 px-4 py-2 font-mono">{currentPage * QUESTIONS_PER_PAGE + index + 1}</td>
                          <td className="text-base text-gray-800 px-4 py-2 max-w-lg whitespace-normal">{question.text}</td>
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <td key={rating} className="text-center px-4 py-2">
                              <button
                                onClick={() => handleAnswer(question.id, rating)}
                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400
                                  ${answers[question.id] === rating
                                    ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-md'
                                    : 'bg-white border-gray-300 hover:bg-blue-50'}
                                `}
                                aria-label={`Rate ${rating}`}
                              >
                                {answers[question.id] === rating && (
                                  <span className="block w-4 h-4 rounded-full bg-white" />
                                )}
                              </button>
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-4 px-4">
                <span>Strongly Disagree</span>
                <span>Strongly Agree</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <Button
              onClick={handlePreviousPage}
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
                      onClick={() => setCurrentPage(i)}
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
              onClick={handleNextPage}
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

export default Index;
