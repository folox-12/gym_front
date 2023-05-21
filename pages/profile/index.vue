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
import { BaseContainer, BaseText } from '~/components/base';
import TraningSubscription from '~/components/profiles/TraningSubscriptionInfo.vue';
import { mapState, mapActions } from 'pinia';
import { useProfileStore } from '~/pinia-store/useProfileStore';
import fetchProfileData from '~/middleware/fetchProfileData';

const Mappers = Vue.extend({
    computed: {
        ...mapState(useProfileStore, ['profile']),
    },

    methods: {
        ...mapActions(useProfileStore, ['getProfileInformation']),
    },
});

Component.registerHooks(['head', 'fetch']);
@Component({
    components: {
        ProfileInfo,
        TraningsCalendar,
        TraningSubscription,
        BaseContainer,
        BaseText,
    },

    middleware: [authorizated, fetchProfileData],
})

export default class ProfilePage extends Mappers {
    header = 'Личный кабинет';

    tabsOld = [
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
            onlyActivated: 1,
        },
    ];

    get tabs() {
        return this.tabsOld.filter((el) => el.onlyActivated === this.profile.data?.is_activated
        || el.onlyActivated === undefined);
    }

    set tabs(value) {
        this.tabsOld = value;
    }

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

        &-name {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

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
                &-name {
                    font-size: var(--gm-font-size-xs) !important;
                }

                .active {
                    padding: 5px;
                }
            }
        }
    }
}
</style>
