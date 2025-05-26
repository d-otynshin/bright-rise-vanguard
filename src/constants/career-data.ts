import { Wrench, Palette, Brain, Users, Target, Calculator } from "lucide-react";
import { CareerType, JobsByPreparation } from "@/types/career";

export const careerSuggestions: Record<string, CareerType> = {
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

export const jobsByPreparation: Record<string, JobsByPreparation> = {
  R: {
    bestFit: [
      "Mechanical Engineer", "Civil Engineer", "Electrical Engineer", "Aerospace Engineer", 
      "Industrial Engineer", "Agricultural Engineer"
    ],
    greatFit: [
      "Electrician", "Carpenter", "Plumber", "Automotive Technician", "Aircraft Mechanic", 
      "Construction Manager", "Welder", "HVAC Technician", "Machinist", "Electronics Technician"
    ]
  },
  A: {
    bestFit: [
      "Art Director", "Creative Director", "Interior Designer", "Graphic Designer", 
      "Film Director", "Music Producer"
    ],
    greatFit: [
      "Photographer", "Fashion Designer", "Animator", "Dance Instructor", "Museum Curator", 
      "Theater Director", "Jewelry Designer", "Multimedia Artist", "Creative Writer"
    ]
  },
  I: {
    bestFit: [
      "Data Scientist", "Research Scientist", "Biomedical Engineer", "Medical Researcher", 
      "Software Engineer", "Environmental Scientist"
    ],
    greatFit: [
      "Physicist", "Chemist", "Mathematician", "Biologist", "Geologist", "Astronomer", 
      "Computer Systems Analyst", "Operations Research Analyst", "Statistician"
    ]
  },
  S: {
    bestFit: [
      "Clinical Psychologist", "Physical Therapist", "Occupational Therapist", 
      "Speech Therapist", "School Counselor", "Social Worker"
    ],
    greatFit: [
      "Registered Nurse", "Special Education Teacher", "Community Health Worker", 
      "Marriage Counselor", "Child Care Worker", "Mental Health Counselor", "Life Coach"
    ]
  },
  E: {
    bestFit: [
      "Business Manager", "Marketing Director", "Financial Advisor", "Investment Banker", 
      "Business Consultant", "Operations Manager"
    ],
    greatFit: [
      "Sales Manager", "Real Estate Agent", "Project Manager", "Public Relations Manager", 
      "Event Coordinator", "Restaurant Manager", "Insurance Sales Agent"
    ]
  },
  C: {
    bestFit: [
      "Financial Analyst", "Database Administrator", "Budget Analyst", "Credit Analyst", 
      "Auditor", "Tax Preparer"
    ],
    greatFit: [
      "Accountant", "Administrative Assistant", "Bookkeeper", "Legal Secretary", 
      "Medical Records Technician", "Quality Control Inspector", "Payroll Clerk"
    ]
  }
};

export const QUESTIONS_PER_PAGE = 5;
