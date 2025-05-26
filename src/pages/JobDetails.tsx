
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share, Printer, ExternalLink, Star, DollarSign, TrendingUp } from "lucide-react";
import Header from "@/components/shared/Header";
import outputData from "@/constants/output.json";

interface JobData {
  title: string;
  alsoCalledList: string[];
  whatTheyDo: string;
  onTheJobDuties: string[];
  knowledge: {
    title: string;
    items: string[];
  }[];
  skills: {
    title: string;
    items: string[];
  }[];
  abilities: {
    title: string;
    items: string[];
  }[];
  personality: {
    description: string;
    traits: string[];
  };
  technology: {
    title: string;
    items: string[];
  }[];
  education: {
    level: string;
    description: string;
    pathways: string[];
  };
  jobOutlook: {
    rating: string;
    description: string;
    salary: {
      median: string;
      range: { min: string; max: string };
    };
    actions: string[];
  };
  exploreMore: {
    relatedCareers: string[];
    industries: string[];
  };
}

// Mock data fallback for when data is not found in output.json
const mockJobData: JobData = {
  title: "Unknown Position",
  alsoCalledList: ["Position Specialist", "Professional"],
  whatTheyDo: "Perform various duties related to their field of expertise.",
  onTheJobDuties: [
    "Complete assigned tasks and responsibilities",
    "Collaborate with team members and stakeholders",
    "Maintain professional standards and quality"
  ],
  knowledge: [
    {
      title: "General Knowledge",
      items: ["basic principles", "industry standards"]
    }
  ],
  skills: [
    {
      title: "Basic Skills",
      items: ["communication", "problem solving"]
    }
  ],
  abilities: [
    {
      title: "Core Abilities",
      items: ["analytical thinking", "attention to detail"]
    }
  ],
  personality: {
    description: "People interested in this work enjoy variety and challenge.",
    traits: ["Adaptability", "Initiative", "Teamwork"]
  },
  technology: [
    {
      title: "Common Software",
      items: ["Microsoft Office", "Email Systems"]
    }
  ],
  education: {
    level: "varies",
    description: "requirements depend on specific role",
    pathways: ["Find Training", "Find Certifications"]
  },
  jobOutlook: {
    rating: "Average",
    description: "Job outlook varies by location and specialization.",
    salary: {
      median: "Varies",
      range: { min: "Contact employer", max: "Contact employer" }
    },
    actions: ["Check local opportunities", "Research requirements"]
  },
  exploreMore: {
    relatedCareers: ["Similar positions in related fields"],
    industries: ["Various industries"]
  }
};

const JobDetails = () => {
  const { jobTitle } = useParams<{ jobTitle: string }>();
  const navigate = useNavigate();
  
  // Try to find job data in output.json first
  const jobId = jobTitle ? decodeURIComponent(jobTitle) : null;
  const jobFromOutput = jobId ? outputData[jobId] : null;
  
  // Use real data if available, otherwise use mock data
  const job = jobFromOutput || mockJobData;
  const isRealData = !!jobFromOutput;
  
  // If using mock data, apply grey styling
  const mockTextClass = isRealData ? "" : "text-gray-500";
  const mockBadgeClass = isRealData ? "" : "bg-gray-100 text-gray-500 border-gray-300";

  if (!jobId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Job Not Found</CardTitle>
            <CardDescription>The requested job information could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/")} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Test
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header
        selectedLanguage="ru"
        selectedType="primary"
        onLanguageChange={() => {}}
        onTypeChange={() => {}}
        onResetToMain={() => navigate("/")}
        maxWidth="6xl"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button 
              onClick={() => navigate("/")} 
              variant="outline" 
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Results
            </Button>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className={`text-4xl font-bold text-blue-600 ${mockTextClass}`}>
                  {job.title}
                </h1>
                {!isRealData && (
                  <p className="text-sm text-gray-400 mt-1">* Mock data - actual job information may vary</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className={mockTextClass}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" size="sm" className={mockTextClass}>
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <p className={`text-blue-600 font-medium mb-2 ${mockTextClass}`}>Also called:</p>
              <div className="flex flex-wrap gap-2">
                {job.alsoCalledList.map((title) => (
                  <Badge key={title} variant="secondary" className={mockBadgeClass}>
                    {title}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* What They Do */}
            <Card>
              <CardHeader>
                <CardTitle className={mockTextClass}>What they do:</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`mb-4 ${mockTextClass}`}>{job.whatTheyDo}</p>
              </CardContent>
            </Card>

            {/* On the Job */}
            <Card>
              <CardHeader>
                <CardTitle className={mockTextClass}>On the job, you would:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.onTheJobDuties.map((duty, index) => (
                    <li key={index} className="flex items-start">
                      <span className={`w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0 ${!isRealData ? 'bg-gray-400' : ''}`}></span>
                      <span className={mockTextClass}>{duty}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Knowledge, Skills, Abilities */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Knowledge */}
            <Card>
              <CardHeader>
                <CardTitle className={`text-purple-600 ${mockTextClass}`}>KNOWLEDGE</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.knowledge.map((section, index) => (
                  <div key={index}>
                    <h4 className={`font-semibold text-purple-600 mb-2 ${mockTextClass}`}>{section.title}</h4>
                    <ul className="space-y-1">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className={`w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-2 flex-shrink-0 ${!isRealData ? 'bg-gray-400' : ''}`}></span>
                          <span className={`text-sm ${mockTextClass}`}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className={`text-orange-600 ${mockTextClass}`}>SKILLS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.skills.map((section, index) => (
                  <div key={index}>
                    <h4 className={`font-semibold text-orange-600 mb-2 ${mockTextClass}`}>{section.title}</h4>
                    <ul className="space-y-1">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className={`w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 mr-2 flex-shrink-0 ${!isRealData ? 'bg-gray-400' : ''}`}></span>
                          <span className={`text-sm ${mockTextClass}`}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Abilities */}
            <Card>
              <CardHeader>
                <CardTitle className={`text-blue-600 ${mockTextClass}`}>ABILITIES</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.abilities.map((section, index) => (
                  <div key={index}>
                    <h4 className={`font-semibold text-blue-600 mb-2 ${mockTextClass}`}>{section.title}</h4>
                    <ul className="space-y-1">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className={`w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0 ${!isRealData ? 'bg-gray-400' : ''}`}></span>
                          <span className={`text-sm ${mockTextClass}`}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Personality and Technology */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Personality */}
            <Card>
              <CardHeader>
                <CardTitle className={`text-purple-600 ${mockTextClass}`}>PERSONALITY</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`mb-4 ${mockTextClass}`}>{job.personality.description}</p>
                <p className={`mb-3 font-medium ${mockTextClass}`}>They do well at jobs that need:</p>
                <div className="grid grid-cols-2 gap-2">
                  {job.personality.traits.map((trait, index) => (
                    <div key={index} className="flex items-center">
                      <span className={`w-1.5 h-1.5 bg-purple-600 rounded-full mr-2 ${!isRealData ? 'bg-gray-400' : ''}`}></span>
                      <span className={`text-sm ${mockTextClass}`}>{trait}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technology */}
            <Card>
              <CardHeader>
                <CardTitle className={`text-green-600 ${mockTextClass}`}>TECHNOLOGY</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`mb-4 text-sm ${mockTextClass}`}>You might use software like this on the job:</p>
                <div className="space-y-4">
                  {job.technology.map((section, index) => (
                    <div key={index}>
                      <h4 className={`font-semibold text-green-600 mb-2 ${mockTextClass}`}>{section.title}</h4>
                      <ul className="space-y-1">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center">
                            <span className={`w-1.5 h-1.5 bg-green-600 rounded-full mr-2 ${!isRealData ? 'bg-gray-400' : ''}`}></span>
                            <span className={`text-sm ${mockTextClass}`}>{item}</span>
                            <ExternalLink className={`w-3 h-3 ml-1 text-orange-500 ${mockTextClass}`} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className={`text-blue-600 ${mockTextClass}`}>EDUCATION</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className={`text-3xl font-bold text-blue-600 mb-2 ${mockTextClass}`}>{job.education.level}</div>
                  <div className={`text-sm text-gray-600 ${mockTextClass}`}>{job.education.description}</div>
                </div>
                <div className="space-y-2">
                  <p className={`text-sm font-medium ${mockTextClass}`}>Get started on your career:</p>
                  {job.education.pathways.map((pathway, index) => (
                    <Button key={index} variant="outline" size="sm" className={`w-full justify-start ${mockTextClass}`}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {pathway}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Outlook */}
            <Card>
              <CardHeader>
                <CardTitle className={`text-orange-600 ${mockTextClass}`}>JOB OUTLOOK</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <TrendingUp className={`w-12 h-12 text-yellow-500 mx-auto mb-2 ${mockTextClass}`} />
                  <div className={`text-2xl font-bold text-orange-600 mb-1 ${mockTextClass}`}>{job.jobOutlook.rating}</div>
                  <p className={`text-sm ${mockTextClass}`}>{job.jobOutlook.description}</p>
                </div>
                <div className="mb-4">
                  <p className={`text-sm font-medium mb-2 ${mockTextClass}`}>SALARY:</p>
                  <div className="text-center">
                    <div className={`text-2xl font-bold text-green-600 ${mockTextClass}`}>{job.jobOutlook.salary.median}</div>
                    <div className={`flex justify-between text-sm text-gray-600 ${mockTextClass}`}>
                      <span>{job.jobOutlook.salary.range.min}</span>
                      <span>{job.jobOutlook.salary.range.max}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {job.jobOutlook.actions.map((action, index) => (
                    <Button key={index} variant="outline" size="sm" className={`w-full ${mockTextClass}`}>
                      {action}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Explore More */}
            <Card>
              <CardHeader>
                <CardTitle className={`text-orange-600 ${mockTextClass}`}>EXPLORE MORE</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className={`text-sm font-medium mb-2 ${mockTextClass}`}>You might like a career in one of these industries:</p>
                    <ul className="space-y-1">
                      {job.exploreMore.relatedCareers.map((career, index) => (
                        <li key={index} className="flex items-start">
                          <span className={`w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0 ${!isRealData ? 'bg-gray-400' : ''}`}></span>
                          <span className={`text-sm text-blue-600 hover:underline cursor-pointer ${mockTextClass}`}>{career}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-1">
                      {job.exploreMore.industries.map((industry, index) => (
                        <li key={index} className="flex items-start">
                          <span className={`w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0 ${!isRealData ? 'bg-gray-400' : ''}`}></span>
                          <span className={`text-sm text-blue-600 hover:underline cursor-pointer ${mockTextClass}`}>{industry}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
