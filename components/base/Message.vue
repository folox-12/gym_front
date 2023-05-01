<template>
    <div
        class="gm-message"
        :class="messageClasses"
    >
        <base-text v-if="value" class="gm-message--text" as="div">
            {{ value }}
        </base-text>
        <base-container v-else>
            <slot/>
        </base-container>
    </div>
</template>
<script lang="ts">
import {
    Vue, Component, Prop,
} from 'vue-property-decorator';

import { BaseText, BaseContainer } from '~/components/base';

enum MessageType{
    DEFAULT = 'default',
    WARNING = 'warning',
}

@Component({
    name: 'message',
    components: {
        BaseText,
        BaseContainer,
    },
})

export default class Message extends Vue {
    @Prop({
        type: String as () => MessageType,
        default: MessageType.DEFAULT,
    }) readonly type?: MessageType;

    @Prop({
        type: String,
    }) readonly value?: string;

    get messageClasses() {
        return {
            [`gm-message--${this.type}`]: this.type,
        };
    }
}
</script>
<style lang="less">
    .gm-message {
        padding-block: 20px;

        &--text {
            padding-inline: 5px;
        }

        &--warning {
            background-color: var(--gm-main-warning-background-color);
        }
        &--default {
            background-color: var(--gm-main-colorfull-background-color);
        }
    }
</style>
