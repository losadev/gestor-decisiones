export type DecisionAttributes = {
  id: string;
  title: string;
  category: CategoryType | string;
  userId: string;
};

export enum CategoryType {
  WORK = "Trabajo",
  HEALTH = "Salud",
  FINANCE = "Finanzas",
  PERSONAL = "Personal",
  FAMILY = "Familia",
  OTHER = "Otro",
}
