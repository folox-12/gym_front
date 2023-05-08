<script lang="ts">
import {
    defineComponent,
    ref,
    computed,
    onMounted,
    watch,
} from '@nuxtjs/composition-api';
import Modal from '~/components/Modal.vue';
import { BaseText, BaseInput } from '~/components/base/';
import { FormRow } from '~/components/form/';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, minLength } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';
import { useBodyPartsStore } from '~/pinia-store/useBodyPartsStore';
import { DIFFICULTIES } from '~/utils/general';
import useNotification from '~/components/mixins/useNotifications';
import { useActivityStore } from '~/pinia-store/useActivityStore';

export default defineComponent({
    components: {
        Modal,
        BaseText,
        BaseInput,
        FormRow,
    },
    setup(_, { emit, expose }) {
        const show = ref(false);
        const { createErrorNotification, createSuccessNotification } = useNotification;

        const BodyPartStore = useBodyPartsStore();
        const { bodyPartForOptions } = storeToRefs(BodyPartStore);
        const { getAllBodyParts } = BodyPartStore;

        const ActivityStore = useActivityStore();
        const { adaptionNewActivity } = storeToRefs(ActivityStore);
        const { createNewActivity } = ActivityStore;

        const difficultiesForOptions = computed(() => DIFFICULTIES.map((el) => ({
            label: el.name,
            value: el.id,
        })));

        const DEFAULT_STATE = {
            name: '',
            kilocalories: undefined,
            difficulty: {
                id: undefined,
                name: null,
            },
            bodypart: {
                id_body_part: undefined,
                name: null,
            },
        };

        const activityState = ref({ ...DEFAULT_STATE });

        const rules = computed(() => ({
            name: {
                required,
                maxLength: maxLength(15),
                minLength: minLength(4),
            },
            difficulty: {
                required,
            },
            bodypart: {
                required,
            },
        }));

        const v$ = useVuelidate(rules, activityState, { $scope: false });

        const toggleConfirm = async() => {
            v$.value.$touch();
            if (v$.value.$error) {
                createErrorNotification('Проверьте правильность ввода полей');
                return;
            }

            const dataActivityToSend = {
                name: activityState.value.name,
                kilocalories: activityState.value.kilocalories,
                id_body_part: activityState.value.bodypart?.id_body_part,
                id_difficulty: activityState.value.difficulty?.id || '',
            };
            await createNewActivity(dataActivityToSend);

            if (adaptionNewActivity.value.error) {
                createErrorNotification(adaptionNewActivity.value.error);
                return;
            }
            createSuccessNotification(
                'Новое упражнение создано и уже добавлено в Ваш список упражнений',
            );
            emit('confirm', adaptionNewActivity.value.data);
        };

        watch(show, (newValue:boolean, oldValue: boolean) => {
            if (oldValue && !newValue) {
                activityState.value = { ...DEFAULT_STATE };
                v$.value.$reset();
            }
        });

        onMounted(async() => {
            await getAllBodyParts();
        });

        expose({
            show,
        });

        return {
            emit,
            show,
            v$,
            activityState,
            bodyPartForOptions,
            difficultiesForOptions,
            toggleConfirm,
        };
    },
});
</script>

<template>
    <modal v-if="show" @close="emit('close')" @confirm="toggleConfirm">
        <template #header>
            <base-text color="normal" weight="bold" size="xl">
                Добавьте своё упражнение!
            </base-text>
        </template>
        <template #body>
            <form-row title="Название">
                <base-input
                    placeholder="Введите название упражнения"
                    :value="v$.name.$model"
                    :invalid="v$.name.$error"
                    @input="
                        (value) => {
                            activityState.name = value.trim();
                        }
                    "
                />
            </form-row>
            <form-row title="Трата килокалории за час">
                <base-input
                    placeholder="Сколько килокалорий тратит Ваше упражнение"
                    :value="activityState.kilocalories"
                    :mask="'####'"
                    @input="(value) => {
                        activityState.kilocalories = value;
                    }"
                />
            </form-row>
            <form-row title="Часть тела ">
                <v-select
                    placeholder="Выбор части тела"
                    :value="v$.bodypart.$model?.name"
                    :options="bodyPartForOptions"
                    @input="
                        ({ value, label }) => {
                            activityState.bodypart = { id_body_part: value, name: label };
                        }
                    "
                />
            </form-row>
            <form-row title="Сложность упражнения">
                <v-select
                    placeholder="Выбор сложности"
                    :value="v$.difficulty.$model?.name"
                    :options="difficultiesForOptions"
                    @input="
                        ({ value, label }) =>{
                            activityState.difficulty = { id: value, name: label };
                        }
                    "
                />
            </form-row>
        </template>
    </modal>
</template>
