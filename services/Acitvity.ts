import { ActivityToSendType, ActivityType } from '~/types/Activity';
import { API_URL, request } from './generic.services';
import APIService from './ApiService';

class Activity extends APIService {
    async fetchAllActivity() {
        const data = request<Array<ActivityType>>(() => this.$axios.$get<Array<ActivityType>>(
            `${API_URL}/activities`,
        ));
        return data;
    }

    async createNewActivity(activity: ActivityToSendType) {
        const data = request<number>(() => this.$axios.$post<number>(
            `${API_URL}/activities/new`,
            { activity },
        ));
        return data;
    }
}

export default Activity;
