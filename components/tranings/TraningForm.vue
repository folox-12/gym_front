<template>
    <base-container>
        <div v-if="loading">
            <base-loader />
        </div>
        <div v-else :class="$style.form">
            <div :class="$style.content">
                <div :class="$style.left">
                    <form-row title="Описание">
                        <base-text as="span">
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
                            {{ fullName || activity.author.email }}
                        </base-text>
                    </form-row>
                </div>
                <div :class="$style.right">
                    <base-simple-table
                        table-title="Список упражнений"
                        :table-headers="DataForTable.headers"
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
            <div v-if="showButton" :class="$style.button">
                <base-button
                    variant="simple"
                    :loading="buttonLoading"
                    :width="100"
                    @click="buttonCallback"
                >
                    {{ buttonText }}
                </base-button>
            </div>
        </div>
    </base-container>
</template>
<script lang="ts">
import {
    Vue, Component, Prop, Emit,
} from 'vue-property-decorator';
import {
    BaseContainer, BaseLoader, BaseButton, BaseSimpleTable, BaseText,
} from '~/components/base';
import { ActivitiesComplexWithActivities } from '~/types/ActivitiesComplex';
import { FormRow } from '~/components/form/';
import { getFullNameFromNameAndSurname } from '~/utils/general';

@Component({
    components: {
        BaseContainer,
        BaseLoader,
        BaseButton,
        FormRow,
        BaseSimpleTable,
        BaseText,
    },
})
export default class TraningForm extends Vue {
    @Prop({
        type: Object as () => ActivitiesComplexWithActivities | null,
    })
    readonly activity?: ActivitiesComplexWithActivities | null;

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

    @Prop({
        type: Boolean,
        default: false,
    })
    readonly buttonLoading?: boolean;

    @Prop({
        type: String,
        default: 'Сохранить',
    })
    readonly buttonText?: string;

    get fullName() {
        if (this.activity && this.activity.author !== undefined) {
            return getFullNameFromNameAndSurname(
                this.activity.author.name,
                this.activity.author.surname,
            );
        }
        return '';
    }

    get DataForTable() {
        return {
            headers: ['Название упражнения', 'Часть тела', 'Сложность'],
            rows: [
                ...this.activity!.activities.map((el) => ({
                    name: el.name,
                    bodypart: el.bodypart.name,
                    difficulty: el.difficulty.name,
                })),
            ],
        };
    }

    // eslint-disable-next-line class-methods-use-this
    @Emit('buttonCallback')
    buttonCallback() {}
}
</script>
<style lang="less" module>
.form {
    background-color: #fff;
    padding: 15px;
    overflow: hidden;
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
    flex: 0 0 30%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-right: 1px solid var(--gm-colors-black-alpha-200);
}

.right {
    flex: 1 0 75%;
    overflow: hidden;
}

@media screen and (max-width: @md) {
    .content {
        flex-direction: column;
        gap: 15px;
    }

    .left, .right {
        flex-basis: 100%;
    }

    .left {
        border-right: none;
        border-bottom: 1px solid var(--gm-colors-black-alpha-200);
    }
}
</style>
