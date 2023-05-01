<script>
import {
    defineComponent,
    ref,
} from "@nuxtjs/composition-api";
import Modal from "~/components/Modal.vue";
import { BaseText } from "~/components/base/";

export default defineComponent({
    components: {
        Modal,
        BaseText,
    },
    setup(_, { emit, expose }) {
        let show = ref(false)

        expose({
            show,
        })
        return {
            emit,
            show,
        };
    },
});
</script>

<template>
        <modal
            v-if="show"
            @close="emit('close')"
            @confirm="emit('confirm')"
        >
            <template #header>
                <base-text color="normal" weight="bold" size="xl">
                    Добавьте своё упражнение!
                </base-text>
            </template>
            <template #default>

            </template>
        </modal>
</template>
