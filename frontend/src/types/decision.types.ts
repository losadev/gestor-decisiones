import { Evaluation } from './evaluation.types';
import { ProCon } from './proCon.types';
import { Recommendation } from './recommendation.types';

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
