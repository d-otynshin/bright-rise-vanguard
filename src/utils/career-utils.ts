
import { Results } from "@/types/career";
import { jobsByPreparation } from "@/constants/career-data";

export const calculateResults = (answers: { [key: number]: number }, questions: any[]): Results => {
  const results: Results = { R: 0, A: 0, I: 0, S: 0, E: 0, C: 0 };
  
  questions.forEach((question) => {
    if (answers[question.id]) {
      results[question.category] += answers[question.id];
    }
  });

  return results;
};

export const getTopThreeTypes = (results: Results) => {
  return Object.entries(results)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([type]) => type as keyof Results);
};

export const getCategorizedJobs = (results: Results) => {
  const topThree = getTopThreeTypes(results);
  const bestFit: string[] = [];
  const greatFit: string[] = [];

  topThree.forEach(type => {
    bestFit.push(...jobsByPreparation[type].bestFit);
    greatFit.push(...jobsByPreparation[type].greatFit);
  });

  return {
    bestFit: [...new Set(bestFit)],
    greatFit: [...new Set(greatFit)]
  };
};
