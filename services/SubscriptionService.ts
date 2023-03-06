import { API_URL, request } from "./generic.services";
import APIService from "./ApiService";

class Subscription extends APIService {
    async subscribeToComplex(id: string | number) {
        const data = request<boolean>(() =>
            this.$axios.$post<boolean>(
                `${API_URL}/subscription/${id}`,
            )
        );

        return data;
    }

    async unsubscribeToComplex(id: string | number) {
        const data = request<boolean>(() =>
            this.$axios.$delete<boolean>(
                `${API_URL}/subscription/${id}`,
            )
        );

        return data;
    }

    async fetchSubscribedComplexesId() {
        const data = request<(number | string)[]>(() =>
            this.$axios.$get<(number | string)[]>(
                `${API_URL}/subscription/ids`,
            )
        );

        return data;
    }

}

export default Subscription;
