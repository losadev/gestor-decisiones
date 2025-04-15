import { ProCon } from "../models/proCon.model";

export type DecisionAttributes = {
  id: string;
  title: string;
  category: CategoryType;
};

export enum CategoryType {
  WORK = "Trabajo",
  HEALTH = "Salud",
  FINANCE = "Finanzas",
  PERSONAL = "Personal",
  FAMILY = "Familia",
  OTHER = "Otro",
}
