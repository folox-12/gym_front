<template>
    <table :class="$style.table">
        <tr v-if="tableTitle">
            <th :colspan="tableHeaders.length">
                <base-text weight="bold" size="lg">
                    {{ tableTitle }}
                </base-text>
            </th>
        </tr>
        <tr v-if="tableHeaders">
            <th v-for="(header, index) in tableHeaders" :key="index">
                <base-text color="lighter" weight="regular">
                    {{ header }}
                </base-text>
            </th>
        </tr>
        <tbody :class="$style.tbody">
            <slot name="rows" />
        </tbody>
    </table>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { BaseText } from "~/components/base";

@Component({
    components: {
        BaseText,
    },
})
export default class SimpleTable extends Vue {
    @Prop({
        type: Number,
        default: 1,
    })
    readonly value?: number;

    @Prop({
        type: String,
    })
    readonly tableTitle?: string;

    @Prop({
        type: Array as () => string[] | undefined,
    })
    readonly tableHeaders?: string[];

    @Prop({
        type: Array as () => string[] | undefined,
    })
    readonly tableRows?: string;
}
</script>
<style lang="less" module>
.table {
    width: 100%;
}

.empty {
    text-align: center;
    padding: 25px 5px;
}
.tbody {
    tr {
        &:hover {
            background-color: var( --gm-colors-black-alpha-20);
        }

        td {
            padding-block: 10px;
        }
    }
}
</style>
