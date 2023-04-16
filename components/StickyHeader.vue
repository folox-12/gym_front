<template>
    <header :class="$style.header">
        <base-container>
            <nav>
                <div :class="$style.icon"
                    @click="$router.push('/')"
                >
                    <img src="~/static/img/mainLogo.png">
                </div>
                <ul>
                    <li v-for="(item, index) in navigationsElements" :key="index" >
                        <nuxt-link class="nuxt-link"  v-if="item.show"
                        :to="item.to"
                        >
                            {{item.name}}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link class="nuxt-link"  v-if="$auth.loggedIn"
                            to="/profile/"
                        >
                            Личный кабинет
                        </nuxt-link>
                    </li>
                </ul>
                <div
                :class="$style.buttons">
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
                            v-if="$auth.user.email && !$auth.user.name"
                            color="light"
                        >
                        {{ $auth.user.email }}
                        </base-text>
                        <base-text
                            v-if="$auth.user.name"
                            color="light"
                        >
                            {{$auth.user.name}}
                        </base-text>
                        <base-text
                            v-if="$auth.user.surname && $auth.user.name"
                            color="light"
                        >
                            {{$auth.user.surname}}
                        </base-text>
                        <base-button
                            text="Выйти"
                            @click="logout"
                        />
                    </div>
                </div>
            </nav>
        </base-container>
    </header>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { BaseContainer, BaseButton, BaseText } from '~/components/base/'

@Component({
    components: {
        BaseContainer,
        BaseButton,
        BaseText,
    }
})
export default class StickyHeader extends Vue {
    navigationsElements = [
        {
            name: 'Главная',
            to: "/",
            show: false,
        },
        {
            name: "Программы тренировок",
            to: "/tranings",
            show: true,
        },
    ];
    logout() {
        this.$auth.logout();
    }
    routeToAuthPage() {
        this.$router.push('/auth')
    }
}

</script>
<style lang="less" module>
.header {
    position: sticky;
    width: 100%;
    background-color: #fff;

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
</style>
