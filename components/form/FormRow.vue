<template>
<div :class="$style.row">
    <slot name="title">
        <div :class="$style.title">
           <base-text
                weight="bold"
                size="lg"
                color="dark"
           >
                {{ title }}
           </base-text>
           <base-text
                v-if="subtitle"
                :class="$style.subtitle"
                color="lighter"
                as="div"
                size="md"
           >
                {{ title }}
           </base-text>
        </div>
    </slot>
    <div :class="$style.content">
        <slot />
    </div>
</div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { BaseText } from "~/components/base/"

@Component({
    components: {
        BaseText
    },
})
export default class FormRow extends Vue {
    @Prop({
        type: String,
        required: true,
    })
    readonly title!: string;

    @Prop({
        type: String,
    })
    readonly subtitle?: string;
}
</script>
<style lang="less" module>
.row {
    margin-bottom: 10px;
}

.title {
}
.subtitle {
    margin-top: 5px;
}

.content {
    margin-top: 5px;
}
</style>
