
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Brain, Target, Users, Wrench, Palette, Calculator } from "lucide-react";

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
  { id: 9, text: "I like conducting research and experiments", category: 'I' },
  { id: 10, text: "I enjoy teaching and mentoring others", category: 'S' },
  { id: 11, text: "I like managing projects and people", category: 'E' },
  { id: 12, text: "I prefer following detailed procedures and rules", category: 'C' },
  { id: 13, text: "I enjoy building and fixing things", category: 'R' },
  { id: 14, text: "I like performing or entertaining others", category: 'A' },
  { id: 15, text: "I enjoy analyzing data and finding patterns", category: 'I' },
  { id: 16, text: "I like counseling and supporting people", category: 'S' },
  { id: 17, text: "I enjoy selling ideas or products", category: 'E' },
  { id: 18, text: "I like keeping accurate records and files", category: 'C' },
  { id: 19, text: "I prefer practical, hands-on work", category: 'R' },
  { id: 20, text: "I enjoy designing and creating new things", category: 'A' },
  { id: 21, text: "I like theoretical and abstract thinking", category: 'I' },
  { id: 22, text: "I enjoy working in healthcare or social services", category: 'S' },
  { id: 23, text: "I like taking risks and making deals", category: 'E' },
  { id: 24, text: "I prefer structured and organized environments", category: 'C' }
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

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const handleAnswer = (rating: number) => {
    const newAnswers = [...answers, rating];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = (): Results => {
    const results: Results = { R: 0, A: 0, I: 0, S: 0, E: 0, C: 0 };
    
    questions.forEach((question, index) => {
      if (answers[index]) {
        results[question.category] += answers[index];
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

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
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

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Question {currentQuestion + 1} of {questions.length}</h2>
              <Badge variant="secondary">{Math.round(progress)}% Complete</Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl leading-relaxed">
                {questions[currentQuestion].text}
              </CardTitle>
              <CardDescription>
                Rate how much you agree with this statement (1 = Strongly Disagree, 5 = Strongly Agree)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    onClick={() => handleAnswer(rating)}
                    variant="outline"
                    size="lg"
                    className="h-16 text-lg font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                  >
                    {rating}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-3">
                <span>Strongly Disagree</span>
                <span>Strongly Agree</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
