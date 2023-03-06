<template>
    <base-container>
        <div v-if="loading">
            <base-loader />
        </div>
        <div :class="$style.form" v-else>
            <div :class="$style.content">
                <div :class="$style.left">
                    <form-row title="Описание">
                        <base-text>
                            {{ activity.description }}
                        </base-text>
                    </form-row>
                    <form-row title="Дата создания">
                        <base-text>
                            {{
                                $dayjs(activity.date_creation).format(
                                    "DD.MM.YYYY"
                                )
                            }}
                        </base-text>
                    </form-row>
                    <form-row title="Автор">
                        <base-text>
                            {{ fullName }}
                        </base-text>
                    </form-row>
                    <form-row title="Рейтинг">
                        <rating :value="activity.rating" readonly />
                    </form-row>
                </div>
                <div :class="$style.right">
                    <base-simple-table
                     tableTitle="Список упражнений"
                     :tableHeaders="DataForTable.headers"

                    >
                        <template #rows>
                            <tr v-for="(item, index) in DataForTable.rows" :key="index">
                                <td>
                                <base-text>
                                    {{ item.name }}
                                </base-text>
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
                            </tr>
                        </template>
                    </base-simple-table>

                </div>
            </div>
            <div :class="$style.button" v-if="showButton">
                <base-button variant="simple" @click="subscribe">
                    Подписаться
                </base-button>
            </div>
        </div>
    </base-container>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { BaseContainer, BaseLoader, BaseButton, BaseSimpleTable, BaseText } from "~/components/base";
import { ActivitiesComplexWithActivities } from "~/types/ActivitiesComplex";
import { FormRow } from "~/components/form/";
import Rating from "~/components/Rating.vue";
import { getFullNameFromNameAndSurname } from "~/utils/general";

@Component({
    components: {
        BaseContainer,
        BaseLoader,
        BaseButton,
        FormRow,
        Rating,
        BaseSimpleTable,
    },
})
export default class TraningForm extends Vue {
    @Prop({
        type: Object as () => ActivitiesComplexWithActivities,
        required: true,
    })
    readonly activity!: ActivitiesComplexWithActivities;

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly loading?: boolean;

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly showButton?: boolean;

    get fullName() {
        if (this.activity.author !== undefined) {
            return getFullNameFromNameAndSurname(
                this.activity.author.name,
                this.activity.author.surname
            );
        }
    }

    get DataForTable() {
        return {
            headers:['Название упражнения', 'Часть тела', 'Сложность'],
            rows:[
              ...this.activity.activities.map(el=>{
                return {
                    name: el.name,
                    bodypart: el.bodypart.name,
                    difficulty: el.difficulty.name,
                }
              })
            ],
        }
    }

    @Emit("subscribe")
    subscribe() {}
}
</script>
<style lang="less" module>
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
