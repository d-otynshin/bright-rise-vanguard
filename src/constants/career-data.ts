
import { Wrench, Palette, Brain, Users, Target, Calculator } from "lucide-react";
import { Question, CareerType, JobsByPreparation } from "@/types/career";

export const questions: Question[] = [
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

export const QUESTIONS_PER_PAGE = 10;
