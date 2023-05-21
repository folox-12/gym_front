import { ActivityType } from './Activity';

export interface CurrentTranings {
    id_traning: number;
    date: Date | string;
    activitiesForTraning: ActivityType[];
}
