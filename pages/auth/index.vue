<template>
    <div :class="$style.auth">
        <div :class="$style.route">
            <nuxt-link to="/">
            {{ $t('auth.backToApp') }}
            </nuxt-link>
        </div>
        <div :class="$style.title">
            <base-text
                size="xl"
                weight="bold"
            >
                {{ $t('general.signIn') }}
            </base-text>
        </div>
        <form :class="$style.authForm">
            <base-text
                :class="$style.item"
                as="div"
            >
                Email
            </base-text>
            <base-input
                v-model="data.email"
            />
            <base-text
                :class="$style.item"
                as="div"
            >
                Пароль

            </base-text>

            <base-input
                v-model="data.password"
                :type-input="typePasswordInput"
                :right-icon-action="showPassword"
                :iconRight="icons.eye"
                iconSize="14"
            />
            <div :class="$style.buttons">
                <base-text
                    as="div"
                >
                    <base-text :class="$style.hasAccount">Ещё нет аккаунта?</base-text>

                    <base-button
                        as="a"
                        @click="routeToRegistrationPage"
                     >
                        Зарегистрируйтесь
                    </base-button>
                </base-text>
                <base-button
                    @click.prevent="loginUser"
                >
                    Отправить
                </base-button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Watch } from 'vue-property-decorator';
import { BaseButton, BaseText, BaseInput } from '~/components/base/';
import { IconHiddenEye } from '~/components/icons/';
import { mdiEye } from '@mdi/js';
import authorizated from '~/middleware/auth';

Component.registerHooks(['head'])

@Component({
    name: "authPage",
    layout: "auth",
    components: {
        BaseButton,
        BaseText,
        BaseInput,
        IconHiddenEye,
    },
    middleware: [authorizated],
})
export default class AuthPage extends Vue{
    data = {
        email:"",
        password:"",

    };
    icons = {
        eye: mdiEye,
    }
    typePasswordInput="password";

    @Watch('$auth.loggedIn', {deep:true})
    onChange(val: boolean) {
        if (val) {
            setTimeout(()=>this.$router.push('/'), 2000);
        }
    }

    head() {
        return {
            title: "Авторизация - fitno"
        }
    }

    showPassword() {
        if (this.data?.password) {
            this.typePasswordInput="text";

            setTimeout(() => this.typePasswordInput="password", 2000);
        }
    }

    routeToRegistrationPage() {
        this.$router.push("/auth/registration")
    }

    async loginUser() {
        try {
            const response = await this.$auth.loginWith('local', {data:this.data});
            if( response && response.status== 200 ) {
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: 'Успешно',
                    text: 'Успшеная авторизация'
                });
            }
        } catch ({responseError :{ message }}) {
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: 'Ошибка',
                    text: message as string,
                })
        }
    }
}

</script>

<style lang="less" module>
.auth {
    display: flex;
    flex-direction: column;
    width: 400px;
    justify-content: center;

    &-form {
        text-align: center;

        & > div {
            margin-bottom: 10px;
        }
    }
}

.item {
    text-align: left;
    color:var(--gm-colors-black-alpha-600);
}

.title {
    text-align: center;

    margin-block: 15px;
}


.buttons {
    display: flex;
    gap:30px;
    margin-top: 10px;
    justify-content: space-between;
}

.has-account {
    display: block;
}
@media screen and (max-width: @md) {
    .auth {
        width: 80%;
    }
    .buttons {
        gap: 0px;
    }

    .has-account {
        display: inline;
    }
}

@media screen and (max-width: @sm) {
    .buttons {
        text-align: left;
    }
}
</style>
