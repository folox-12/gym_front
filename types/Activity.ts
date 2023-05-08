import { DifficultyType } from './Difficulty';

export interface BodyPartType {
    id_body_part: string | number,
    code: string,
    name: string,
}

export interface ActivityType {
    id_activity: string | number;
    name: string;
    kilocalories: number;
    id_difficulty?: string | number;
    id_body_part?: string | number;
    bodypart: BodyPartType;
    difficulty: DifficultyType;
}
export interface ActivityToSendType {
    name?: string;
    kilocalories?: number;
    id_difficulty?: string | number;
    id_body_part?: string | number;
}
