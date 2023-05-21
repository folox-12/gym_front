<script lang="ts">
import {
    defineComponent,
    useContext,
    ref,
} from '@nuxtjs/composition-api';
import GymTitle from '~/components/Title.vue';
import { BaseButton, BaseIcon, BaseText } from '~/components/base';
import { mdiArrowLeftBoldBox, mdiArrowRightBoldBox } from '@mdi/js';

export default defineComponent({
    components: {
        GymTitle,
        BaseButton,
        BaseIcon,
        BaseText,
    },

    setup() {
        const { $dayjs, app: { router } } = useContext();
        const showDate = ref(new Date());
        const icons = {
            left: mdiArrowLeftBoldBox,
            right: mdiArrowRightBoldBox,
        };
        const dayClicked = (value: any) => {
            const formattedDate = $dayjs(value).format('YYYY-MM-DD');
            router!.push(`/profile/${formattedDate}`);
        };
        return {
            icons,
            showDate,
            dayClicked,
        };
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
                        <base-button
                            variant="unstyle"
                            @click="showDate = headerProps.previousPeriod"
                        >
                            <base-icon
                                :path="icons.left"
                            />
                        </base-button>
                        <base-text
                            weight="bold"
                            size="xl"
                            color="dark"
                        >
                            {{ headerProps.periodLabel }}
                        </base-text>
                        <base-button
                            variant="unstyle"
                            @click="showDate = headerProps.nextPeriod"
                        >
                            <base-icon
                                :path="icons.right"
                            />
                        </base-button>
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
        box-shadow: var(--gm-shadow-general-box);

        &-header {
            display: flex;
            justify-content: center;
            align-items: center;
            text-transform: capitalize;
            margin-bottom: 20px;
        }
    }
</style>

<style lang="less">
    .cv-header-day {
        font-weight: var(--gm-font-weight-bold);
        padding-block: 15px!important;

        &.dow6, &.dow0 {
            color: #fff;
            background-color: var(--gm-colors-error) !important;
        }
    }

    .cv {
        &-day {
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--gm-main-colorfull-background-color-alpha-100);
            color: var(--gm-colors-black-alpha-600);
            cursor: pointer;

            &-number {
                align-self: center!important;
            }

            &:hover {
                color: #fff;
                box-shadow: inset 0px 0px 5px rgba(0,0,0,0.5);
                background-color: var(--gm-main-colorfull-background-color-alpha-600);
            }
        }
    }

</style>
