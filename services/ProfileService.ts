import { User } from '~/types/Users';
import { API_URL, request } from './generic.services';
import APIService from './ApiService';

class Profile extends APIService {
    async fetchSubscribedComplexesId() {
        const data = request<(number | string)[]>(() => this.$axios.$get<(number | string)[]>(
            `${API_URL}/subscription/ids`));

        return data;
    }

    async fetchInfo() {
        const data = request<User>(() => this.$axios
            .$get<User>(
                `${API_URL}/profile/`,
            ));

        return data;
    }

    async changeProfileName(form: Partial<User>) {
        const data = request<boolean>(() => this.$axios
            .$post<boolean>(
                `${API_URL}/profile/name`,
                form,
            ));

        return data;
    }
}

export default Profile;
