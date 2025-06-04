export interface ProConAttributes {
  id: string;
  description: string;
  type: ProConType;
  weight: number;
  decisionId: string;
}

export interface ProConReqBody {
  id: string;
  description: string;
  type: ProConType;
  weight: number;
}

export enum ProConType {
  PRO = "Pro",
  CONTRA = "Contra",
}
