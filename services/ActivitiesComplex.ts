import { API_URL, request } from "./generic.services";
import {
    ActivitiesComplexType,
    ActivitiesComplexWithActivities,
} from "~/types/ActivitiesComplex";
import { FiltersTypes } from "~/types/Filters";
import APIService from "./ApiService";
import { FiltersResponseType } from "~/types/network";

class ActivitiesComplex extends APIService {
    async getMainActivitiesComplex(filters: FiltersTypes) {
        const data = request<FiltersResponseType<ActivitiesComplexType[]>>(() =>
            this.$axios.$get<FiltersResponseType<ActivitiesComplexType[]>>(
                `${API_URL}/activities-complex`,
                { params: { filters } }
            )
        );
        return data;
    }

    async getCurrentActivity(id: string | number) {
        const data = request<ActivitiesComplexWithActivities>(() =>
            this.$axios.$get<ActivitiesComplexWithActivities>(
                `${API_URL}/activities-complex/${id}`
            )
        );
        return data;
    }
}

export default ActivitiesComplex;
