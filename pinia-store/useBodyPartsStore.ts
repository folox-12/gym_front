import { defineStore } from 'pinia';
import { BodyPartType } from '~/types/Activity';
import { NetworkData } from '~/types/helpers';
import { $services } from '~/utils/service';

interface State {
    bodyParts: NetworkData<Array<BodyPartType>>;
}

export const useBodyPartsStore = defineStore('bodyPart', {
    state: ():State => ({
        bodyParts: {
            loading: false,
            data: null,
            error: null,
        },
    }),
    getters: {
        bodyPartForOptions({ bodyParts }) {
            if (!bodyParts.data?.length) return [];
            return bodyParts.data.map((el) => ({
                label: el.name,
                value: el.id_body_part,
            }));
        },
    },
    actions: {
        async getAllBodyParts() {
            this.bodyParts.loading = true;
            const { data, error } = await $services.bodyPart.fetchAllActivity();
            if (error) {
                this.bodyParts = { data: null, error, loading: false };
                return;
            }
            this.bodyParts = { data, loading: false, error: null };
        },
    },
});
