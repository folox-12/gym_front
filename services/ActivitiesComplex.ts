import { API_URL } from "./generic.services";
import { ActivitiesComplexType } from "~/types/ActivitiesComplex";
import { FiltersTypes } from "~/types/Filters";
import APIService from "./ApiService";
import { FiltersResponseType } from "~/types/network";

class ActivitiesComplex extends APIService {
    async getMainActivitiesComplex(filters: FiltersTypes) {
        const data = await this.$axios.$get<
            FiltersResponseType<Array<ActivitiesComplexType>>
        >(`${API_URL}/activities-complex`, { params: { filters } });
        return data;
    }
}

export default ActivitiesComplex;
