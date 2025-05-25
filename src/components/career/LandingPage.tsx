
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Building, User } from "lucide-react";

interface LandingPageProps {
  onStartTest: () => void;
}

const LandingPage = ({ onStartTest }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              What do you want to do for a living?
            </h1>
          </div>

          {/* Three Cards Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Search Careers Card */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white pb-6">
                <div className="flex items-center justify-center mb-3">
                  <Search className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl text-center">Search careers with key words.</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-gray-600 mb-4">
                  Describe your dream career in a few words:
                </CardDescription>
                <div className="flex gap-2">
                  <Input 
                    placeholder="electrician" 
                    className="flex-1"
                  />
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Examples: doctor, build houses</p>
              </CardContent>
            </Card>

            {/* Browse by Industry Card */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-700 text-white pb-6">
                <div className="flex items-center justify-center mb-3">
                  <Building className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl text-center">Browse careers by industry.</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-gray-600 mb-4">
                  There are over 900 career options for you to look at. Find yours in one of these industries:
                </CardDescription>
                <div className="flex gap-2">
                  <select className="flex-1 p-2 border border-gray-300 rounded-md">
                    <option>Administration & Support Services</option>
                    <option>Healthcare</option>
                    <option>Technology</option>
                    <option>Education</option>
                    <option>Finance</option>
                  </select>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Discover Interests Card */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-700 text-white pb-6">
                <div className="flex items-center justify-center mb-3">
                  <User className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl text-center">Discover your interests.</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-gray-600 mb-4">
                  Answer questions about the type of work you might enjoy. We'll suggest careers that match your interests and training.
                </CardDescription>
                <Button 
                  onClick={onStartTest}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Start <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="text-center">
            <div className="flex justify-center gap-16 text-lg font-medium text-gray-700 mb-8">
              <div className="text-emerald-600">"I want to be a ..."</div>
              <div className="text-orange-600">"I'll know it when I see it."</div>
              <div className="text-purple-600">"I'm not really sure."</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
