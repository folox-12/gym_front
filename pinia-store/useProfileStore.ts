import { defineStore } from 'pinia';
import { NetworkData } from '~/types/helpers';
import { $services } from '~/utils/service';
import { User } from '~/types/Users';

interface State {
    profile: NetworkData<User>,
    changeName: NetworkData<boolean>,
}

export const useProfileStore = defineStore('profile', {
    state: (): State => ({
        profile: {
            data: null,
            loading: false,
            error: null,
        },

        changeName: {
            data: null,
            loading: false,
            error: null,
        },
    }),

    getters: {
        isActivated({ profile }) {
            return !!profile.data?.is_activated;
        },
    },

    actions: {
        async getProfileInformation() {
            this.profile.loading = true;

            const { data, error } = await $services.profile.fetchInfo();
            if (error) {
                this.profile = { ...this.profile, error, loading: false };
                return;
            }
            this.profile = { data, loading: false, error: null };
        },

        async changeNameMethod(form: Partial<User>) {
            this.changeName.loading = true;

            const { data, error } = await $services.profile.changeProfileName(form);
            if (error) {
                this.changeName = { ...this.changeName, error, loading: false };
                return;
            }
            this.changeName = { data, loading: false, error: null };
        },
    },
});
