<template>
    <div :class="$style.content">
        <h1 class="gm--title" :class="$style.title">
            <base-text size="xxl" weight="bold" color="dark">
                <slot />
            </base-text>
        </h1>
        <div v-if="$slots.buttons" :class="$style.buttons">
            <slot name="buttons">
                <base-button v-if="buttonText" :class="$style.button">
                    {{ buttonText }}
                </base-button>
            </slot>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { BaseText, BaseContainer, BaseButton } from '~/components/base';

@Component({
    name: 'GymTitle',
    components: {
        BaseText,
        BaseContainer,
        BaseButton,
    },
})
export default class GymTitle extends Vue {
    @Prop({
        type: String,
        required: false,
    })
    readonly title?: string;

    @Prop({
        type: String,
        required: false,
    })
    readonly subtitle?: string;

    @Prop({
        type: String,
        required: false,
    })
    readonly buttonText?: string;
}
</script>
<style lang="less" module>
.h1 {
    display: block;
    font-size: var(--gm-font-size-xxl)!important;
}

.content {
    display: flex;
    justify-content: start;
    gap: 5px;
    align-items: center;
}

.title {
    font-size: var(--gm-font-size-xxl)!important;
}

.button {
    height: fit-content;
}

.buttons  {
    margin-left: 10px;
    & > div {
        display: flex;
        gap: 5px;
    }

}

@media screen and(max-width: @md) {
    .title {
    }
}
</style>
