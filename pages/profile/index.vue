<template>
    <div :class="$style.profile">
        <base-container>
            <div :class="$style.profileTabs">
                <div
                    v-for="(item, index) in tabs"
                    :key="index"
                >
                    <div
                        :class="{
                            [$style.profileTab]: true,
                            [$style.active]: item.show,
                        }"
                        @click="changeActiveTab(index)"
                    >
                        {{ item.name }}
                    </div>

                    <div v-show="item.show" :class="$style.content">
                        <component :is="item.component" />
                    </div>
                </div>
            </div>
        </base-container>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import authorizated from '~/middleware/auth';
import ProfileInfo from '~/components/profiles/ProfileInfo.vue';
import TraningsCalendar from '~/components/profiles/TraningsCalendar.vue';
import { BaseContainer } from '~/components/base';
import TraningSubscription from '~/components/profiles/TraningSubscriptionInfo.vue';

Component.registerHooks(['fetch']);
@Component({
    components: {
        ProfileInfo,
        TraningsCalendar,
        TraningSubscription,
        BaseContainer,
    },

    middleware: [authorizated],
})

export default class ProfilePage extends Vue {
    header = 'Личный кабинет';

    tabs = [
        {
            name: 'Основная информация',
            component: ProfileInfo,
            show: true,
        },
        {
            name: 'Подписки',
            component: TraningSubscription,
            show: false,
        },
        {
            name: 'Календарь занятий',
            component: TraningsCalendar,
            show: false,
        },
    ];

    head() {
        return {
            title: this.header,
        };
    }

    changeActiveTab(index: number) {
        this.tabs = this.tabs.map((el, idx) => {
            let show = false;
            if (idx === index) show = true;
            return {
                ...el,
                show,
            };
        });
    }
}
</script>
<style lang="less" module>
.profile {
    margin-top: 40px;

    &-tabs {
        display: flex;
        gap: 15px;
        align-items: end;
        position: relative;
        border-bottom: 1px solid var(--gm-colors-black-alpha-200);
    };

    &-tab {
        overflow: hidden;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        border: 1px solid var(--gm-colors-black-alpha-400);
        padding: 10px;
        background-color: #fff;
        cursor: pointer;
        color: var(--gm-colors-black-alpha-600);

        &:hover {
            box-shadow: 0px 10px 8px rgba(0, 0, 0, .1);
        }

        &.active {
            color: #fff;
            background-color: @darkGreen;
            padding-inline: 25px;
            padding-bottom: 15px;
        }
    }

    .content {
        position: absolute;
        top: 100%;
        left: 0;
        height: 100%;
        width: 100%;
    }

    @media screen and (max-width: @md) {
        .profile {
            &-tabs {
                justify-content: center;
                gap: 10px;
            }

            &-tab {
                .active {
                    padding: 10px;
                }
            }
        }
    }
}
</style>
