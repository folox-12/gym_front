import { UserAsAuthor } from "./Users";
import { ActivityType } from "./Activity";

export interface ActivitiesComplexType {
    id_activities_complex?: number;
    id_author: number | null;
    title: string | null;
    description: string | null;
    date_creation: string | null;
    rating: number | null;
    author?: UserAsAuthor;
}
export interface ActivitiesComplexWithActivities extends ActivitiesComplexType {
    activities: ActivityType[];
}
