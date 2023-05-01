import { API_URL, request } from "./generic.services";
import APIService from "./ApiService";
import { ActivityType } from "~/types/Activity";

class Activity extends APIService {
    async fetchAllActivity() {
        const data = request<Array<ActivityType>>(() =>
            this.$axios.$get<Array<ActivityType>>(
                `${API_URL}/activities`,
            )
        );

        return data;
    }
}

export default Activity;
