export type EvaluationAttributes = {
  id: string;
  result: string;
  score: number;
  date: Date;
  decisionId: string;
};

export type EvaluationCreateInput = {
  result: string;
  score: number;
  date: Date;
  decisionId: string;
  userId: string;
};
