<script lang="ts">
import {
    defineComponent,
    useContext,
    ref,
} from '@nuxtjs/composition-api';
import GymTitle from '~/components/Title.vue';
import { BaseButton } from '~/components/base'

export default defineComponent({
    components: {
        GymTitle,
        BaseButton,
    },

    setup() {
        const { $dayjs, app: { router } } = useContext();
        const showDate = ref(new Date());

        const dayClicked = (value: any) => {
            const formattedDate = $dayjs(value).format('DD-MM-YYYY');
            router!.push(`/profiles/tranings/${formattedDate}`);
        };
        return {
            showDate,
            dayClicked,
        };
    },
    created() {
    },
});
</script>
<template>
    <div class="ProfileTranings">
        <client-only>
            <gym-title>
                Календарь
            </gym-title>
            <calendar-view
                month-name-format="short"
                locale="ru"
                :class="$style.calendar"
                :show-date="showDate"
                :starting-day-of-week="1"
                @click-date="dayClicked"
            >
                <template #header="{ headerProps }">
                    <div :class="$style.calendarHeader">
                        <button
                            class="custom-header__button"
                            @click="showDate = headerProps.previousPeriod"
                        >
                            {{ '<' }}
                        </button>
                        <span class="custom-header__label">
                            {{ headerProps.periodLabel }}
                        </span>
                        <button
                            class="custom-header__button"
                            @click="showDate = headerProps.nextPeriod"
                        >
                            >
                        </button>
                    </div>
                </template>
            </calendar-view>
        </client-only>
    </div>
</template>

<style lang="less" module>
    .title {
        margin-bottom: 20px;
    }

    .calendar {
        padding: 20px 10px;
        background-color: #fff;

        &-header {
            text-align: center;
            text-transform: capitalize;
            margin-bottom: 20px;
        }
    }
</style>
