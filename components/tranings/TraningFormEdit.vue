<script lang="ts">
import {
    defineComponent,
    computed,
    onMounted,
    onBeforeUnmount,
    ref,
} from '@nuxtjs/composition-api';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, minLength } from '@vuelidate/validators';
import {
    BaseContainer,
    BaseLoader,
    BaseButton,
    BaseSimpleTable,
    BaseText,
    BaseInput,
    BaseIcon,
    BaseMessage,
} from '~/components/base';
import { FormRow } from '~/components/form/';
import { getFullNameFromNameAndSurname } from '~/utils/general';
import { useActivityStore } from '~/pinia-store/useActivityStore';
import { storeToRefs } from 'pinia';
import { mdiDeleteForever } from '@mdi/js';
import Modal from '~/components/Modal.vue';
import { ActivityType } from '~/types/Activity';
import { useActivitiesComplexForm } from '~/pinia-store/useActivitiesComplexForm';
import AddNewActivityModal from '~/components/tranings/AddNewActivityModal.vue';

export default defineComponent({
    components: {
        BaseContainer,
        BaseLoader,
        BaseButton,
        FormRow,
        BaseSimpleTable,
        BaseText,
        BaseInput,
        BaseIcon,
        BaseMessage,
        Modal,
        AddNewActivityModal,
    },
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        showButton: {
            type: Boolean,
            default: false,
        },
    },

    setup(_, { emit, expose }) {
        const emptyActivitiesMessage = 'Проверьте правильность ввода упражнений. Необходимо ввести минимум одно упражнение. При вводе двух или более упражнений, повторения не допускаются';

        const activitiesForm = useActivitiesComplexForm();
        const { activitiesComplexForm: form, activities } = storeToRefs(activitiesForm);
        const { updateForm, resetCurrentActivityForm } = activitiesForm;

        const deleteIcon = mdiDeleteForever;
        const activitiyStore = useActivityStore();
        const { allActivities } = storeToRefs(activitiyStore);
        const { getAllActivities } = activitiyStore;

        const addNewActivityModal = ref<typeof AddNewActivityModal>();

        const showConfirmDeleteModalState = ref<{
            choosenId?: number;
            show: boolean;
        }>({
            show: false,
        });

        const title = computed(() => form.value.title);
        const allAcvitivitiesForOptions = computed(() => allActivities.value.map((el) => ({
            label: el.name,
            value: el.id_activity,
        })));
        const description = computed(() => form.value.description);
        const fullName = computed(() => {
            if (form.value.author !== undefined) {
                return getFullNameFromNameAndSurname(
                    form.value.author.name,
                    form.value.author.surname,
                );
            }
            return '';
        });
        const DataForTable = computed(() => ({
            headers: ['Название упражнения', 'Часть тела', 'Сложность'],
            rows:
                activities.value.map((el: ActivityType) => ({
                    name: el?.name,
                    bodypart: el?.bodypart.name,
                    difficulty: el?.difficulty.name,
                })) || [],
        }));

        const isDataEmpty = computed(
            () => DataForTable.value.rows.length === 0,
        );

        const rules = {
            title: {
                required,
                maxLength: maxLength(40),
                minLength: minLength(10),
            },
            description: {
                required,
                maxLength: maxLength(100),
                minLength: minLength(10),
            },
            activities: {
                required,
                isNotDuplicate() {
                    const idsArr = activities.value.map(
                        // eslint-disable-next-line camelcase
                        ({ id_activity }) => id_activity,
                    );
                    return new Set(idsArr).size === activities.value.length;
                },
            },
        };

        const v$ = useVuelidate(rules, { title, description, activities });

        const addNewItem = (id?: number) => {
            const newActivity = id !== undefined
                ? allActivities.value.find((el) => el.id_activity === id)
                : allActivities.value[0] || {};

            const activitiesNew = [...activities.value, newActivity!];
            updateForm({ activities: activitiesNew });
        };

        function validateForm(): { isValid: boolean } {
            v$.value.$touch();
            return { isValid: !v$.value.$error };
        }
        function edit() {
            emit('edit');
        }

        function openModal(id?: number) {
            showConfirmDeleteModalState.value = {
                choosenId: id,
                show: true,
            };
        }

        const deleteActivity = () => {
            const index: number | undefined = showConfirmDeleteModalState.value.choosenId;
            if (index === undefined) return;
            const activitiesNew = activities.value.filter(
                (__, idx) => idx !== index,
            );
            updateForm({ activities: activitiesNew });

            showConfirmDeleteModalState.value = {
                show: false,
            };
        };

        const changeActivity = (value: number, index: number) => {
            const newActivities = activities.value.map(
                (el: ActivityType, idx) => {
                    if (index === idx) {
                        return allActivities.value.find(
                            // eslint-disable-next-line camelcase
                            ({ id_activity }) => id_activity === value,
                        ) as ActivityType;
                    }
                    return el;
                },
            );

            updateForm({ activities: newActivities });
        };

        const addedNewActivity = async(id: number) => {
            await getAllActivities();
            addNewActivityModal.value!.show = false;
            addNewItem(id);
        };

        onBeforeUnmount(() => {
            resetCurrentActivityForm();
        });

        onMounted(async() => {
            await getAllActivities();
        });

        expose(['validateForm']);
        return {
            v$,
            form,
            fullName,
            DataForTable,
            title,
            description,
            deleteIcon,
            showConfirmDeleteModalState,
            allAcvitivitiesForOptions,
            isDataEmpty,
            emptyActivitiesMessage,
            addNewActivityModal,
            allActivities,
            addedNewActivity,
            getAllActivities,
            changeActivity,
            validateForm,
            updateForm,
            addNewItem,
            deleteActivity,
            openModal,
            edit,
        };
    },
});
</script>

<template>
    <base-container>
        <div v-if="loading">
            <base-loader />
        </div>
        <div v-else :class="$style.form">
            <div :class="$style.content">
                <form-row title="Название программы">
                    <base-input
                        :value="v$.title.$model"
                        :invalid="v$.title.$error"
                        placeholder="Введите название комплекса упражнений"
                        @input="(value) => updateForm({ title: value.trim() })"
                    />
                </form-row>
                <form-row title="Описание">
                    <base-input
                        as="textarea"
                        :value="v$.description.$model"
                        :invalid="v$.description.$error"
                        placeholder="Введите описание комплекса упражнений"
                        @input="
                            (value) => updateForm({ description: value.trim() })
                        "
                    />
                </form-row>
                <form-row title="Дата создания">
                    <base-text v-if="form.date_creation">
                        {{ $dayjs(form.date_creation).format("DD.MM.YYYY") }}
                    </base-text>
                </form-row>
                <form-row title="Автор">
                    <base-text> {{ fullName || ('Вы') }} </base-text>
                </form-row>
                <base-message
                    v-if="v$.activities.$error"
                    type="warning"
                    :value="emptyActivitiesMessage"
                />
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
                                <v-select
                                    :value="item.name"
                                    :options="allAcvitivitiesForOptions"
                                    :clearable="false"
                                    placeholder="Выбор упражнения"
                                    @input="
                                        ({ value }) =>
                                            changeActivity(value, index)
                                    "
                                />
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
                                    @click="openModal(index)"
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
                <div :class="$style.addButton">
                    <base-button variant="simple" @click="addNewItem()">
                        Добавить
                    </base-button>

                    <base-button
                        variant="simple"
                        @click="addNewActivityModal.show = true"
                    >
                        Своё упражнение
                    </base-button>
                </div>
            </div>
            <div v-if="showButton" :class="$style.button">
                <base-button @click="edit">
                    Сохранить
                </base-button>
            </div>
        </div>
        <modal
            v-if="showConfirmDeleteModalState.show"
            @close="showConfirmDeleteModalState.show = false"
            @confirm="deleteActivity"
        >
            <template #header>
                <base-text color="normal" weight="bold" size="xl">
                    Вы действительно хотите удалить программу?
                </base-text>
            </template>
        </modal>
        <add-new-activity-modal
            ref="addNewActivityModal"
            :exists-activities="allActivities"
            @close="addNewActivityModal.show = false"
            @confirm="(value) => addedNewActivity(value)"
        />
    </base-container>
</template>
<style lang="less" module>
.empty {
    text-align: center;
    padding-block: 10px;
}

.add-button {
    margin: 10px;
    text-align: center;
}

.form {
    background-color: #fff;
    padding: 15px;
}

.button {
    margin-top: 10px;
    display: flex;
    justify-content: end;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.left {
    flex: 0 0 35%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-right: 1px solid var(--gm-colors-black-alpha-200);
}

.right {
    flex: 1 0 auto;
    overflow: hidden;
}
</style>
