<template>
    <div>
        <modal
            v-if="showConfirmModal"
            :loading="isDeleted.loading"
            @close="() => (showConfirmModal = false)"
            @confirm="deleleteCurrentActivity"
        >
            <template #header>
                <base-text color="normal" weight="bold" size="xl">
                    Вы действительно хотите удалить программу?
                </base-text>
            </template>
        </modal>
        <base-container>
            <nuxt-link to="/tranings/">
                {{ "<< Вернуться" }}
            </nuxt-link>
            <gym-title>
                <template #default>
                    {{ currentTraningsInformation.title }}
                </template>
                <template #buttons>
                    <div class="d-flex">
                        <div v-for="(icon, index) of icons" :key="index">
                            <base-button
                                v-if="icon.show"
                                variant="unstyle"
                                :title="icon.title"
                                @click="icon.action"
                            >
                                <base-icon :path="icon.icon" :color="icon.color" />
                            </base-button>
                        </div>
                    </div>
                </template>
            </gym-title>
        </base-container>
        <traning-form-edit
            ref="traningFormEdit"
            :loading="currentActivity.loading"
            :show-button="$auth.loggedIn"
            @edit="edit"
        />
    </div>
</template>
<script lang="ts">
import {
    Vue, Component, Mixins, Ref,
} from 'vue-property-decorator';
import getCurrentId from '~/components/mixins/getCurrentId';
import GymTitle from '~/components/Title.vue';
import { mapState, mapActions } from 'pinia';
import { useActivitiesComplex } from '~/pinia-store/ActivitiesComplexStore';
import { useSubscription } from '~/pinia-store/SubscriptionStore';
import { useActivitiesComplexForm } from '~/pinia-store/useActivitiesComplexForm';
import {
    BaseContainer,
    BaseText,
    BaseButton,
    BaseIcon,
} from '~/components/base';
import TraningFormEdit from '~/components/tranings/TraningFormEdit.vue';
import { mdiDelete, mdiCreditCard } from '@mdi/js';
import isUserAuthorComplex from '~/middleware/isUserAuthorComplex';
import authorizated from '~/middleware/auth';
import { ActivitiesComplexWithActivities } from '~/types/ActivitiesComplex';

const Mappers = Vue.extend({
    computed: {
        ...mapState(useActivitiesComplex, ['currentActivity', 'isDeleted', 'isUpdated']),
        ...mapState(useSubscription, ['isSubscribed']),
        ...mapState(useActivitiesComplexForm, ['activitiesComplexForm']),
    },

    methods: {
        ...mapActions(useActivitiesComplex, [
            'getCurrentActivity',
            'resetCurrentActivityForm',
            'deleteActivity',
            'updateActivitiesComplex',
        ]),

        ...mapActions(useSubscription, ['subscribeToComplex']),

        ...mapActions(useActivitiesComplexForm, ['updateForm']),
    },
});

@Component({
    components: {
        GymTitle,
        BaseContainer,
        TraningFormEdit,
        BaseText,
        BaseButton,
        BaseIcon,
    },

    middleware: [authorizated, isUserAuthorComplex],
})
export default class CurrentTranings extends Mixins(getCurrentId, Mappers) {
    @Ref() readonly traningFormEdit!: typeof TraningFormEdit;

    showConfirmModal = false;

    get header() {
        return `Редактирование программы №${this.currentId}`;
    }

    get currentTraningsInformation() {
        return this.currentActivity.data;
    }

    get isUserAuthor() {
        return this.currentTraningsInformation
            ? this.$auth?.user?.id === this.currentTraningsInformation.id_author
            : false;
    }

    get icons() {
        return {
            iconEdit: {
                icon: mdiCreditCard,
                color: 'basic',
                title: 'Вернуться на страницу карточки',
                action: this.routeToSimple,
                show: this.isUserAuthor,
            },

            iconDelete: {
                icon: mdiDelete,
                color: 'danger',
                title: 'Удалить',
                action: this.deleleteCurrentActivity,
                show: this.isUserAuthor,
            },
        };
    }

    async deleleteCurrentActivity() {
        await this.deleteActivity(this.currentId);

        if (this.isDeleted.error) {
            this.$notify({
                group: 'server-response',
                type: 'error',
                title: 'Ошибка',
                text: this.isDeleted.error,
            });
        } else {
            this.$notify({
                group: 'server-response',
                type: 'success',
                title: 'Успешно',
                text: 'Комплекс удален',
            });

            this.showConfirmModal = false;
            this.$router.push('/tranings/');
        }
    }

    routeToSimple() {
        this.$router.push(`/tranings/${this.currentId}`);
    }

    async edit() {
        const { isValid } = this.traningFormEdit.validateForm();
        if (!isValid) {
            this.$notify({
                group: 'server-response',
                type: 'error',
                title: 'Ошибка',
                text: 'Проверьте правильность ввода данных',
            });

            return;
        }

        await this.updateActivitiesComplex(
            this.activitiesComplexForm as ActivitiesComplexWithActivities,
        );

        if (this.isUpdated.error) {
            this.$notify({
                group: 'server-response',
                type: 'error',
                title: 'Ошибка',
                text: 'Ошибка обновления',
            });
        } else {
            this.$notify({
                group: 'server-response',
                type: 'success',
                title: 'Успешно',
                text: 'Изменения успешно сохранены',
            });

            this.routeToSimple();
        }
    }

    head() {
        return {
            title: this.header,
        };
    }

    beforeDestroy() {
        this.resetCurrentActivityForm();
    }

    async fetch() {
        await this.getCurrentActivity(this.currentId);

        this.updateForm({
            ...this.currentTraningsInformation,
            date_creation: new Date(this.currentTraningsInformation!.date_creation!),
        });
    }
}
</script>
