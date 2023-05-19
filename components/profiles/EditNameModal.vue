<script lang="ts">
import {
    defineComponent,
    ref,
    computed,
    reactive,
    onMounted,
    watch,
} from '@nuxtjs/composition-api';
import Modal from '~/components/Modal.vue';
import { BaseText, BaseInput } from '~/components/base/';
import { FormRow } from '~/components/form/';
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, minLength } from '@vuelidate/validators';
import useNotification from '~/components/mixins/useNotifications';
import { useProfileStore } from '~/pinia-store/useProfileStore';
import { storeToRefs } from 'pinia';

export default defineComponent({
    components: {
        Modal,
        BaseText,
        BaseInput,
        FormRow,
    },

    props: {
        profileData: {
            type: Object as () => any,
            required: true,
        },
    },

    setup(props, { emit, expose }) {
        const show = ref(false);
        const { createErrorNotification, createSuccessNotification } = useNotification;
        const { changeNameMethod } = useProfileStore();
        const { changeName } = storeToRefs(useProfileStore());

        const currentForm = reactive({
            ...props.profileData,
        });

        const rules = computed(() => ({
            name: {
                required,
                maxLength: maxLength(30),
                minLength: minLength(4),
            },

            surname: {
                required,
                maxLength: maxLength(30),
                minLength: minLength(4),
            },
        }));

        const v$ = useVuelidate(rules, currentForm, { $scope: false });

        const toggleConfirm = async() => {
            v$.value.$touch();
            if (v$.value.$error) {
                createErrorNotification('Проверьте правильность ввода полей');
                return;
            }
            await changeNameMethod(currentForm);
            if (changeName.value.error) {
                createErrorNotification(changeName.value.error);
                return;
            }
            createSuccessNotification(
                'Данные обновлены',
            );

            emit('confirm');
        };

        watch(show, (newValue:boolean, oldValue: boolean) => {
            if (oldValue && !newValue) {
                v$.value.$reset();
            }
        });

        onMounted(async() => {
        });

        expose({
            show,
        });

        return {
            emit,
            show,
            v$,
            toggleConfirm,
            currentForm,
        };
    },
});
</script>

<template>
    <modal v-if="show" @close="emit('close')" @confirm="toggleConfirm">
        <template #header>
            <base-text color="normal" weight="bold" size="xl">
                Изменение информации о пользователе
            </base-text>
        </template>
        <template #body>
            <form-row title="Имя">
                <base-input
                    placeholder="Введите имя"
                    :mask="'A'.repeat(30)"
                    :value="v$.name.$model"
                    :invalid="v$.name.$error"
                    @input="(value) => currentForm.name=value.trim()"
                />
            </form-row>
            <form-row title="Фамилия">
                <base-input
                    placeholder="Введите фамилию"
                    :mask="'A'.repeat(30)"
                    :value="v$.surname.$model"
                    :invalid="v$.surname.$error"
                    @input="(value) => currentForm.surname=value.trim()"
                />
            </form-row>
        </template>
    </modal>
</template>
