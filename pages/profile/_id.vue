<script lang="ts">
import {
    defineComponent,
    useContext,
    ref,
    useMeta,
    onBeforeMount,
    onBeforeUnmount,
    computed,
} from '@nuxtjs/composition-api';
import GymTitle from '~/components/Title.vue';
import isActivated from '~/middleware/isActivated';
import authorizated from '~/middleware/auth';
import {
    BaseContainer, BaseLoader, BaseText, BaseSimpleTable,
} from '~/components/base';
import { useTraningStore } from '~/pinia-store/useCurrentTraningsStore';
import { storeToRefs } from 'pinia';
import { useSubscription } from '~/pinia-store/SubscriptionStore';
import { FormRow } from '~/components/form/';
import { mdiChevronLeft, mdiDeleteForever } from '@mdi/js';
import { ActivityType } from '~/types/Activity';
import useNotification from '~/components/mixins/useNotifications';
import { useTraningForm } from '~/pinia-store/useCurrentTraningForm';

export default defineComponent({
    components: {
        GymTitle,
        BaseContainer,
        BaseLoader,
        BaseText,
        BaseSimpleTable,
        FormRow,
    },

    middleware: [authorizated, isActivated],

    setup() {
        const { route, app: { $dayjs } } = useContext();

        const showDate = ref(new Date());
        const { id: formattedDate } = route.value.params;
        const formattedDateVia = $dayjs(formattedDate).format('DD.MM.YYYY');
        const showLeft = ref(false);
        const arrowLeft = mdiChevronLeft;
        const deleteIcon = mdiDeleteForever;
        const { createErrorNotification, createSuccessNotification } = useNotification;

        const traningStore = useTraningStore();
        const { traning, traningValue, updatingTraning } = storeToRefs(traningStore);
        const { fetchCurrentTraning, updateCurrentTraning } = traningStore;

        const subscription = useSubscription();
        const { subscribedComplexes } = storeToRefs(subscription);
        const { fetchSubscribedComplexes } = subscription;

        const traningFormStore = useTraningForm();
        const { traningForm } = storeToRefs(traningFormStore);
        const { updateForm, resetCurrentActivityForm } = traningFormStore;

        const loading = computed(() => (
            traning.value.loading || subscribedComplexes.value.loading
        ));
        const gymTitle = `Тренировка ${formattedDateVia}`;

        const DataForTable = computed(() => ({
            headers: ['Название упражнения', 'Килокалории', 'Часть тела', 'Сложность'],
            rows:
                traningForm.value.activitiesForTraning.map((el: ActivityType) => ({
                    id: el.id_activity,
                    name: el?.name,
                    bodypart: el?.bodypart.name,
                    kilocalories: el?.kilocalories,
                    difficulty: el?.difficulty.name,
                })) || [],
        }));

        const isDataEmpty = computed(
            () => DataForTable.value.rows.length === 0,
        );

        const addActivityToCurrentTraning = (activity: ActivityType) => {
            let isAdded = false;
            if (traningValue.value) {
                const checkingOnAdding = traningForm.value.activitiesForTraning
                    // eslint-disable-next-line camelcase
                    .findIndex(({ id_activity }) => activity.id_activity === id_activity) !== -1;
                isAdded = checkingOnAdding;
            }

            if (isAdded) {
                createErrorNotification('Данное упражнение уже добавлено в тренировку');
                return;
            }

            updateForm({
                activitiesForTraning: [
                    ...traningForm.value.activitiesForTraning,
                    activity,
                ],
            });
        };

        const edit = async() => {
            await updateCurrentTraning(traningForm.value);
            if (updatingTraning.value.error) {
                createErrorNotification('Ошибка при сохранении');
                return;
            }

            createSuccessNotification('Сохранение удалось');
            await fetchCurrentTraning(formattedDate);
        };

        const removeActivityFromCurrent = (id: number) => {
            const newActivities = traningForm
                // eslint-disable-next-line camelcase
                .value.activitiesForTraning.filter(({ id_activity }) => (
                    // eslint-disable-next-line camelcase
                    id_activity !== id
                ));

            updateForm({
                activitiesForTraning: newActivities,
            });
        };

        const { title } = useMeta();
        title.value = gymTitle;

        onBeforeMount(async() => {
            Promise.all([
                await fetchCurrentTraning(formattedDate),
                await fetchSubscribedComplexes(),
            ]);

            const newValue = traning.value.data ? traning.value.data : {
                date: formattedDate,
            };
            updateForm({ ...newValue });
        });

        onBeforeUnmount(() => {
            resetCurrentActivityForm();
        });

        return {
            loading,
            traning,
            showLeft,
            arrowLeft,
            subscribedComplexes,
            gymTitle,
            showDate,
            traningValue,
            traningForm,
            DataForTable,
            isDataEmpty,
            deleteIcon,
            edit,
            addActivityToCurrentTraning,
            removeActivityFromCurrent,
        };
    },

    head: {},
});
</script>
<template>
    <base-container>
        <nuxt-link
            to="/profile/"
        >
            {{ '< Вернуться в профиль' }}
        </nuxt-link>
        <gym-title>
            {{ gymTitle }}
        </gym-title>
        <div v-if="loading" :class="$style.loading">
            <base-loader :loading="loading" />
        </div>
        <div v-else :class="$style.content">
            <div :class="{[$style.left]: true, [$style.show]: showLeft}">
                <base-button
                    variant="simple"
                    :class="{
                        [$style.button]: true,
                    }"
                    @click="showLeft=!showLeft"
                >
                    <base-icon
                        :class="{[$style.icon]: true, [$style.rotated]: showLeft}"
                        :path="arrowLeft"
                    />
                </base-button>
                <div v-show="showLeft">
                    <base-text
                        size="xl"
                        weight="bold"
                        as="div"
                        :class="$style.mainTitle"
                    >
                        Подписки
                    </base-text>
                    <form-row
                        v-for="(item, index) in subscribedComplexes.data"
                        :key="index"
                        :class="$style.row"
                        :title="`${item.title} от ${item.author.name} ${item.author.surname}`"
                    >
                        <table :class="$style.subscription">
                            <thead>
                                <tr>
                                    <td>
                                        <base-text
                                            color="light"
                                        >
                                            Название
                                        </base-text>
                                    </td>
                                    <td>
                                        <base-text
                                            color="light"
                                        >
                                            Килокалории
                                        </base-text>
                                    </td>
                                    <td>
                                        <base-text
                                            color="light"
                                        >
                                            Часть тела
                                        </base-text>
                                    </td>
                                    <td>
                                        <base-text
                                            color="light"
                                        >
                                            Сложность
                                        </base-text>
                                    </td>
                                    <td />
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(property, idx) in item.activities"
                                    :key="idx"
                                >
                                    <td>
                                        {{ property.name }}
                                    </td>
                                    <td>
                                        {{ property.kilocalories || "-" }}
                                    </td>
                                    <td>
                                        {{ property.bodypart.name }}
                                    </td>
                                    <td>
                                        {{ property.difficulty.name }}
                                    </td>
                                    <td>
                                        <base-button
                                            @click="addActivityToCurrentTraning(property)"
                                        >
                                            +
                                        </base-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form-row>
                </div>
            </div>
            <div :class="$style.right">
                <base-text
                    size="xl"
                    weight="bold"
                    as="div"
                    :class="$style.mainTitle"
                >
                    Текущая тренировка
                </base-text>
                <div class="div">
                    <base-simple-table
                        table-title="Список упражнений"
                        :table-headers="DataForTable.headers"
                    >
                        <template #rows>
                            <tr
                                v-for="(item, index) in DataForTable.rows"
                                :key="index"
                            >
                                <td>
                                    <base-text>
                                        {{ item.name }}
                                    </base-text>
                                </td>
                                <td>
                                    <base-text>
                                        {{ item.kilocalories || "-" }}
                                    </base-text>
                                </td>
                                <td>
                                    <base-text>
                                        {{ item.bodypart }}
                                    </base-text>
                                </td>
                                <td>
                                    <base-text>
                                        {{ item.difficulty }}
                                    </base-text>
                                </td>
                                <td>
                                    <base-button
                                        variant="unstyle"
                                        @click="removeActivityFromCurrent(item.id)"
                                    >
                                        <base-icon
                                            :path="deleteIcon"
                                            variant="unstyle"
                                            width="35"
                                            height="35"
                                        />
                                    </base-button>
                                </td>
                            </tr>
                            <tr v-if="isDataEmpty">
                                <td colspan="4">
                                    <base-text
                                        :class="$style.empty"
                                        size="xl"
                                        as="div"
                                        color="lighter"
                                    >
                                        Пусто
                                    </base-text>
                                </td>
                            </tr>
                            <tr />
                        </template>
                    </base-simple-table>
                </div>
                <base-button @click="edit">
                    Сохранить
                </base-button>
            </div>
        </div>
    </base-container>
</template>
<style lang="less" module>
.content {
    display: flex;
    gap: 10px;

    & > div {
        padding: 15px;
        border-radius: 5px;
        position: relative;
    }
}

.main-title {
    margin-bottom: 10px;
}
.left {
    flex: 0 0 5%;
    background-color: transparent;
    box-shadow: none;

    &.show {
        flex: 0 1 35%;
        background-color: #fff;
        box-shadow: var(--gm-shadow-general-box);
    }
}
.right {
    flex: 1 1 45%;
    background-color: #fff;
    box-shadow: var(--gm-shadow-general-box);
}

.button {
    position: absolute;
    top: 0;
    right: -5px;
}

.icon {
    transition: all ease .3s;
    transform: rotate(180deg);
}

.rotated {
    transform: rotate(0);
}

.row {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-inline: 5px;
    background-color: var(--gm-colors-main-background-300);
}
.items {
    display: flex;
    gap: 10px
}

.item {
    display: flex;
    flex-direction: column;
    text-align: center;

    .title {
        flex-grow: 1;
    }
}

table.subscription {
    width: 100%;

    thead {
        tr{
            td{
                text-align: center;
            }
        }
    }
    tbody {
        tr {
            td {
                padding-block: 10px;
                text-align: center;
            }

            &:hover {
                background-color: var(--gm-colors-black-alpha-100);
            }
        }
    }
}

.empty {
    text-align: center;
    padding-block: 10px;
}

@media screen and (max-width: @xl) {
    .content {
        flex-direction: column;

        & > div {
            flex: 1 0 100% !important;
        }
    }

    .icon {
        transition: all ease .3s;
        transform: rotate(270deg);
    }

    .rotated {
        transform: rotate(90deg);
    }
}
</style>
