import { API_URL, request } from "./generic.services";
import APIService from "./ApiService";
import { BodyPartType } from "~/types/Activity";

class BodyPart extends APIService {
    async fetchAllActivity() {
        const data = request<Array<BodyPartType>>(() =>
            this.$axios.$get<Array<BodyPartType>>(
                `${API_URL}/bodyparts`,
            )
        );

        return data;
    }
}

export default BodyPart;