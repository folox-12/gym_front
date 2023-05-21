<script lang="ts">
import {
    defineComponent,
} from '@nuxtjs/composition-api';
import { BaseText } from '~/components/base';

export default defineComponent({
    components: {
        BaseText,
    },

    props: {
        name: {
            type: String,
            required: true,
        },
    },

    setup() {

    },
});
</script>
<template>
    <div>
        <base-text>
        </base-text>
        <slot/>
    </div>
</template>
