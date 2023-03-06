import { DifficultyType } from "./Difficulty"

interface BodyPartType {
    id_body_part: string | number,
    code: string,
    name: string,
}

export interface ActivityType {
    id_activity: string | number,
    name: string,
    kilocalories: string | number,
    id_difficulty: string | number,
    id_body_part: string | number,
    bodypart: BodyPartType,
    difficulty: DifficultyType,

}
