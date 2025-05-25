
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Briefcase, Star, Award } from "lucide-react";
import { Results } from "@/types/career";
import { careerSuggestions } from "@/constants/career-data";
import { getTopThreeTypes, getCategorizedJobs } from "@/utils/career-utils";

interface ResultsPageProps {
  results: Results;
  onJobClick: (jobTitle: string) => void;
  onResetTest: () => void;
}

const ResultsPage = ({ results, onJobClick, onResetTest }: ResultsPageProps) => {
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
                Jobs organized by preparation level based on your top interest areas. Click on any job to learn more.
              </CardDescription>
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
                  {categorizedJobs.bestFit.map((job) => (
                    <div
                      key={job}
                      onClick={() => onJobClick(job)}
                      className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Star className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-gray-800">{job}</span>
                      </div>
                    </div>
                  ))}
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
                  {categorizedJobs.greatFit.map((job) => (
                    <div
                      key={job}
                      onClick={() => onJobClick(job)}
                      className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Award className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-gray-800">{job}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              onClick={onResetTest} 
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
};

export default ResultsPage;
