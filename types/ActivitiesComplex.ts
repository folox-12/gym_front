import { UserAsAuthor } from "./Users";

export interface ActivitiesComplexType {
    id_activities_complex?: number;
    id_author: number;
    title: string;
    description: string;
    date_creation: Date;
    rating: number;
    author: UserAsAuthor;
}
