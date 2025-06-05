export enum DecisionCategoryType {
    WORK = 'Trabajo',
    HEALTH = 'Salud',
    FINANCE = 'Finanzas',
    PERSONAL = 'Personal',
    FAMILY = 'Familia',
    OTHER = 'Otro',
}

export type DecisionAttributes = {
    id: string;
    title: string;
    category: DecisionCategoryType | string;
    userId: string;
};

export type ProCon = {
    description: string;
    type: string;
    weight: number;
};

export interface Evaluation {
    id?: string;
    decisionId: string;
    score: number;
    createdAt: string;
    result?: string;
    date?: string;
}

export interface Recommendation {
    id: string;
    decisionId: string;
}

export enum CategoryType {
    WORK = 'Trabajo',
    HEALTH = 'Salud',
    FINANCE = 'Finanzas',
    PERSONAL = 'Personal',
    FAMILY = 'Familia',
    OTHER = 'Otro',
}

export type DecisionData = {
    id: string;
    title: string;
    category: CategoryType;
    description?: string;
    status: 'progress' | 'evaluated';
    userId: string;
    proCons: ProCon[];
    evaluation?: Evaluation;
    recommendation?: Recommendation;
    createdAt: string;
};
