<template>
    <header
        ref="header"
        :class="{
            [$style.header]: true,
            [$style.transperent]: transperentMutation,
        }"
    >
        <base-container>
            <nav>
                <div
                    :class="$style.icon"
                    @click="$router.push('/')"
                >
                    <img src="~/static/img/mainLogo.png">
                </div>
                <ul
                    :class="$style.desktopMenu"
                >
                    <li v-for="(item, index) in navigationsElements" :key="index">
                        <nuxt-link
                            v-if="item.show && item.desktop"
                            class="nuxt-link"
                            :to="item.to"
                        >
                            {{ item.name }}
                        </nuxt-link>
                    </li>
                </ul>
                <base-button
                    variant="unstyle"
                    :class="$style.burger"
                    @click="openMobileMenu"
                >
                    <base-icon
                        width="48"
                        height="48"
                        :path="iconsMenu"
                    />
                </base-button>
                <div
                    :class="$style.buttons"
                >
                    <base-button
                        v-if="!$auth.loggedIn"
                        :text="$t('general.signIn')"
                        @click="routeToAuthPage"
                    />
                    <div
                        v-else
                        :class="$style.logged"
                    >
                        <base-text
                            v-if="profileData.email && !profileData.name"
                            color="light"
                        >
                            {{ profileData.email }}
                        </base-text>
                        <base-text
                            v-if="profileData.name"
                            color="light"
                        >
                            {{ profileData.name }}
                        </base-text>
                        <base-text
                            v-if="profileData.surname && profileData.name"
                            color="light"
                        >
                            {{ profileData.surname }}
                        </base-text>
                        <base-button
                            text="Выйти"
                            @click="logout"
                        />
                    </div>
                </div>
            </nav>
            <mobile-header
                ref="mobileHeader"
                :elements="navigationsElements"
            />
        </base-container>
    </header>
</template>

<script lang="ts">
import {
    Vue, Component, Ref, Prop, Watch,
} from 'vue-property-decorator';
import { mdiMenu } from '@mdi/js';
import { BaseContainer, BaseButton, BaseText } from '~/components/base/';
import MobileHeader from '~/components/MobileHeader.vue';
import { mapActions, mapState } from 'pinia';
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

@Component({
    components: {
        BaseContainer,
        BaseButton,
        BaseText,
        MobileHeader,
    },
    middleware: [fetchProfileData],
})
export default class StickyHeader extends Mappers {
    @Ref('mobileHeader') mobileHeader!: typeof MobileHeader;

    @Ref('header') header!: HTMLDivElement;

    @Prop({
        type: Boolean,
        default: false,
    }) readonly transperent!: boolean;

    iconsMenu = mdiMenu;

    topDistance = 0;

    transperentMutation = this.transperent;

    get profileData() {
        return this.profile.data;
    }

    get navigationsElements(): Array<{
        name: string,
        to?: string,
        show: boolean,
        desktop?: boolean,
        close: boolean
        cb?: Function,
    }> {
        return [
            {
                name: 'Главная',
                to: '/',
                show: false,
                close: true,
            },
            {
                name: 'Программы тренировок',
                to: '/tranings/',
                desktop: true,
                show: true,
                close: true,
            },
            {
                name: 'Личный кабинет',
                to: '/profile/',
                desktop: true,
                close: true,
                show: this.$auth.loggedIn,
            },
            {
                name: 'Войти',
                close: true,
                desktop: false,
                show: !this.$auth.loggedIn,
                cb: () => this.routeToAuthPage(),
            },
            {
                name: 'Выйти',
                close: true,
                desktop: false,
                show: this.$auth.loggedIn,
                cb: () => this.logout(),
            },
        ].filter(({ show }) => show);
    }

    @Watch('topDistance')
    onChange(newVal: number, oldVal: number) {
        if (!oldVal && newVal) this.transperentMutation = false;
        if (oldVal && !newVal) this.transperentMutation = true;
    }

    mounted() {
        if (this.transperent) {
            window.addEventListener('scroll', this.changeDistance);
            this.changeDistance();
        }
    }

    changeDistance() {
        this.topDistance = window.pageYOffset;
    }

    openMobileMenu() {
        this.mobileHeader.isOpen = true;
    }

    logout() {
        this.$auth.logout();
    }

    routeToAuthPage() {
        this.$router.push('/auth');
    }
}

</script>
<style lang="less" module>
.desktop-menu {}
.burger {
    display: none;
}

.header {
    position: fixed;
    width: 100%;
    background-color: #fff;
    z-index: 999;
    transition: 1s ease;

    &.transperent {
        background: transparent;
    }

    nav {
        display: grid;
        grid-template-columns: 150px auto 1fr;
        align-items: center;

        ul {
            display: flex;
            margin: 0;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: space-around;
        }
    }
}

.icon {
    position: relative;
    width: 120px;
    height: 120px;
    cursor: pointer;

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.buttons {
    justify-self: end;
}

.logged {
    display: flex;
    gap:10px;
}

@media screen and (max-width: @lg) {
    .header {
        nav {
            justify-content: space-between;
            grid-template-columns: 1fr auto;
        }
    }
    .desktop-menu {
        display: none !important;
    }

    .buttons {
        &:not(.burger) {
            display: none !important;
        }
    }

    .burger {
        display: block;
    }

}
</style>
