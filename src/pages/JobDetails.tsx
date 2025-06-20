
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share, Printer, ExternalLink, Star, DollarSign, TrendingUp } from "lucide-react";
import Header from "@/components/shared/Header";
import output from "@/constants/output.json";

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

const mockJob = {
  title: "Civil Engineers",
  alsoCalledList: ["Civil Engineer", "Design Engineer", "Project Engineer", "Structural Engineer"],
  whatTheyDo: "Perform engineering duties in planning, designing, and overseeing construction and maintenance of building structures and facilities, such as roads, railroads, airports, bridges, harbors, channels, dams, irrigation projects, pipelines, power plants, and water and sewage systems.",
  onTheJobDuties: [
    "Direct engineering activities, ensuring compliance with environmental, safety, or other governmental regulations.",
    "Manage and direct the construction, operations, or maintenance activities at project site.",
    "Inspect project sites to monitor progress and ensure conformance to design specifications and safety or sanitation standards."
  ],
  knowledge: [
    {
      title: "Engineering and Technology",
      items: ["design", "product and service development"]
    },
    {
      title: "Math and Science",
      items: ["arithmetic, algebra, geometry, calculus, or statistics", "physics"]
    },
    {
      title: "Arts and Humanities",
      items: ["English language"]
    },
    {
      title: "Business",
      items: ["management"]
    }
  ],
  skills: [
    {
      title: "Basic Skills",
      items: ["listening to others, not interrupting, and asking good questions", "reading work related information"]
    },
    {
      title: "Problem Solving",
      items: ["noticing a problem and figuring out the best way to solve it"]
    },
    {
      title: "People and Technology Systems",
      items: ["figuring out how a system should work and how changes in the future will affect it", "thinking about the pros and cons of different options and picking the best one"]
    }
  ],
  abilities: [
    {
      title: "Verbal",
      items: ["communicate by speaking", "communicate by writing"]
    },
    {
      title: "Ideas and Logic",
      items: ["make general rules or come up with answers from lots of detailed information", "notice when problems happen"]
    },
    {
      title: "Math",
      items: ["choose the right type of math to solve a problem", "add, subtract, multiply, or divide"]
    },
    {
      title: "Visual Understanding",
      items: ["quickly compare groups of letters, numbers, pictures, or other things"]
    }
  ],
  personality: {
    description: "People interested in this work like activities that include practical, hands-on problems and solutions.",
    traits: ["Integrity", "Attention to Detail", "Dependability", "Initiative", "Analytical Thinking", "Self Control"]
  },
  technology: [
    {
      title: "Computer aided design CAD software",
      items: ["Autodesk AutoCAD Civil 3D", "Autodesk Revit"]
    },
    {
      title: "Presentation software",
      items: ["Microsoft PowerPoint"]
    },
    {
      title: "Analytical or scientific software",
      items: ["Procore software", "The MathWorks MATLAB"]
    }
  ],
  education: {
    level: "bachelor's degree",
    description: "usually needed",
    pathways: ["Find Training", "Find Certifications", "Find Licenses", "Apprenticeship.gov"]
  },
  jobOutlook: {
    rating: "Bright",
    description: "New job opportunities are very likely in the future.",
    salary: {
      median: "$99,590",
      range: { min: "$65,920", max: "$160,990" }
    },
    actions: ["Check out my state", "Local Salary Info", "Find Jobs"]
  },
  exploreMore: {
    relatedCareers: ["Civil Engineering Technologists & Technicians", "Construction & Building Inspectors", "Construction Managers", "Transportation Engineers", "Water/Wastewater Engineers"],
    industries: ["Professional, Scientific, & Technical", "Government", "Construction"]
  }
}

const JobDetails = () => {
  const { jobTitle } = useParams<{ jobTitle: string }>();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<'ru' | 'kz'>('ru');
  const [selectedType, setSelectedType] = useState<'primary' | 'secondary'>('secondary');
  
  const job = jobTitle ? mockJob : null;

  if (!job) {
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
        selectedLanguage={selectedLanguage}
        selectedType={selectedType}
        onLanguageChange={setSelectedLanguage}
        onTypeChange={setSelectedType}
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
              <h1 className="text-4xl font-bold text-blue-600">{output[jobTitle]?.['title_ru']}</h1>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-blue-600 font-medium mb-2">Also called:</p>
              <div className="flex flex-wrap gap-2">
                {job.alsoCalledList.map((title, index) => (
                  <Badge key={index} variant="secondary">{title}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* What They Do */}
            <Card>
              <CardHeader>
                <CardTitle>What they do:</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{output[jobTitle]?.['description_primary_ru']}</p>
              </CardContent>
            </Card>

            {/* On the Job */}
            <Card>
              <CardHeader>
                <CardTitle>On the job, you would:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.onTheJobDuties.map((duty, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{duty}</span>
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
                <CardTitle className="text-purple-600">KNOWLEDGE</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.knowledge.map((section, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-purple-600 mb-2">{section.title}</h4>
                    <ul className="space-y-1">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span className="text-sm">{item}</span>
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
                <CardTitle className="text-orange-600">SKILLS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.skills.map((section, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-orange-600 mb-2">{section.title}</h4>
                    <ul className="space-y-1">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span className="text-sm">{item}</span>
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
                <CardTitle className="text-blue-600">ABILITIES</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.abilities.map((section, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-blue-600 mb-2">{section.title}</h4>
                    <ul className="space-y-1">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span className="text-sm">{item}</span>
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
                <CardTitle className="text-purple-600">PERSONALITY</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{job.personality.description}</p>
                <p className="mb-3 font-medium">They do well at jobs that need:</p>
                <div className="grid grid-cols-2 gap-2">
                  {job.personality.traits.map((trait, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></span>
                      <span className="text-sm">{trait}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technology */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">TECHNOLOGY</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm">You might use software like this on the job:</p>
                <div className="space-y-4">
                  {job.technology.map((section, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-green-600 mb-2">{section.title}</h4>
                      <ul className="space-y-1">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></span>
                            <span className="text-sm">{item}</span>
                            <ExternalLink className="w-3 h-3 ml-1 text-orange-500" />
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
                <CardTitle className="text-blue-600">EDUCATION</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{job.education.level}</div>
                  <div className="text-sm text-gray-600">{job.education.description}</div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Get started on your career:</p>
                  {job.education.pathways.map((pathway, index) => (
                    <Button key={index} variant="outline" size="sm" className="w-full justify-start">
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
                <CardTitle className="text-orange-600">JOB OUTLOOK</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <TrendingUp className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600 mb-1">{job.jobOutlook.rating}</div>
                  <p className="text-sm">{job.jobOutlook.description}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">SALARY:</p>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{job.jobOutlook.salary.median}</div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{job.jobOutlook.salary.range.min}</span>
                      <span>{job.jobOutlook.salary.range.max}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {job.jobOutlook.actions.map((action, index) => (
                    <Button key={index} variant="outline" size="sm" className="w-full">
                      {action}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Explore More */}
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600">EXPLORE MORE</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">You might like a career in one of these industries:</p>
                    <ul className="space-y-1">
                      {job.exploreMore.relatedCareers.map((career, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span className="text-sm text-blue-600 hover:underline cursor-pointer">{career}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-1">
                      {job.exploreMore.industries.map((industry, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span className="text-sm text-blue-600 hover:underline cursor-pointer">{industry}</span>
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
