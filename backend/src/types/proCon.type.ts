export interface ProCon {
  id: string;
  title: string;
  type: ProConType;
  weight: number;
  decisionId: string;
}

export enum ProConType {
  PRO = "PRO",
  CONTRA = "CONTRA",
}
