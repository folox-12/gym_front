<template>
    <base-container>
        <div :class="$style.content">
            <h1 class="gm--title">
                <base-text size="xxl" weight="bold" color="dark">
                    <slot />
                </base-text>
            </h1>
            <div :class="$style.buttons">
                <slot name="buttons">
                    <base-button :class="$style.button" v-if="buttonText">
                        {{ buttonText }}
                    </base-button>
                </slot>
            </div>
        </div>
    </base-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { BaseText, BaseContainer, BaseButton } from "~/components/base";

@Component({
    name: "GymTitle",
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
}

.content {
    display: flex;
    justify-content: start;
    gap: 5px;
    align-items: center;
}

.button {
    height: fit-content;
}

.buttons > div {
    display: flex;
    gap: 5px;
    margin-left: 10px;
}
</style>
