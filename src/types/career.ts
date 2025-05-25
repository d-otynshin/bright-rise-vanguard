
export interface Question {
  id: number;
  text: string;
  category: 'R' | 'A' | 'I' | 'S' | 'E' | 'C';
}

export interface Results {
  R: number;
  A: number;
  I: number;
  S: number;
  E: number;
  C: number;
}

export interface CareerType {
  title: string;
  description: string;
  icon: any;
  color: string;
  careers: string[];
}

export interface JobsByPreparation {
  bestFit: string[];
  greatFit: string[];
}
