import { CurrentTranings } from '~/types/CurrentTraningsTypes';
import { API_URL, request } from './generic.services';
import APIService from './ApiService';

class CurrentTraning extends APIService {
    async fetchCurrentTraning(date: string) {
        const data = request<CurrentTranings>(() => this.$axios
            .$get<CurrentTranings>(
                `${API_URL}/profile/${date}`,
            ));

        return data;
    }

    async updateCurrentTraning(form: Partial<CurrentTranings>) {
        const data = request<boolean>(() => this.$axios
            .$post<boolean>(
                `${API_URL}/profile/`,
                { form },
            ));

        return data;
    }
}

export default CurrentTraning;
