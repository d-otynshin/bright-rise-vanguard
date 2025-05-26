type Results = {
  R: number;
  A: number;
  I: number;
  S: number;
  E: number;
  C: number;
};

type JobCodeMap = {
  [id: string]: {
    RAISEC: string;
  };
};

type MatchResult = {
  id: string;
  RAISEC: string;
  score: number;
};

type GroupedMatches = {
  bestMatch: MatchResult[];
  relatedMatches: MatchResult[];
  otherMatches: MatchResult[];
};

export const calculateResults = (
  answers: { [key: number]: number },
  questions: { id: number; category: keyof Results }[]
): { topType: string; scores: Results } => {
  const results: Results = { R: 0, A: 0, I: 0, S: 0, E: 0, C: 0 };

  questions.forEach((question) => {
    if (answers[question.id]) {
      results[question.category] += answers[question.id];
    }
  });

  const topType = (Object.keys(results) as (keyof Results)[]).reduce((a, b) =>
    results[a] > results[b] ? a : b
  );

  return { topType, scores: results };
};

export const getTopThreeTypes = (results: Results): (keyof Results)[] => {
  return Object.entries(results)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([type]) => type as keyof Results);
};

export const calculateMatchScore = (userCode: string, jobCode: string): number => {
  let score = 0;
  for (let i = 0; i < userCode.length; i++) {
    const userChar = userCode[i];
    if (userChar === jobCode[i]) {
      score += 3;
    } else if (jobCode.includes(userChar)) {
      score += 1;
    }
  }
  return score;
};

export const getCategorizedMatches = (
  results: Results,
  jobCodes: JobCodeMap
): GroupedMatches => {
  const topThree = getTopThreeTypes(results);
  const userRAISEC = topThree.join(""); // e.g. "ASI"

  const allMatches: MatchResult[] = Object.entries(jobCodes).map(([id, { RAISEC }]) => ({
    id,
    RAISEC,
    score: calculateMatchScore(userRAISEC, RAISEC)
  }));

  const bestMatch: MatchResult[] = [];
  const relatedMatches: MatchResult[] = [];
  const otherMatches: MatchResult[] = [];

  for (const match of allMatches) {
    if (match.score >= 6) {
      bestMatch.push(match);
    } else if (match.score >= 4) {
      relatedMatches.push(match);
    } else if (match.score >= 1) {
      otherMatches.push(match);
    }
  }

  bestMatch.sort((a, b) => b.score - a.score);
  relatedMatches.sort((a, b) => b.score - a.score);
  otherMatches.sort((a, b) => b.score - a.score);

  return { bestMatch, relatedMatches, otherMatches };
};