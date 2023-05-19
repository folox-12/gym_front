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
                Зарегистрироваться
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
                :icon-right="icons.eye"
                icon-size="14"
            />
            <base-button
                :class="$style.button"
                @click.prevent="registrationUser"
            >
                Зарегистроваться
            </base-button>
        </form>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { BaseButton, BaseText, BaseInput } from '~/components/base/';
import { IconHiddenEye } from '~/components/icons/';
import { mdiEye } from '@mdi/js';
import authorizated from '~/middleware/auth';
import { registration } from '~/services/user.services';

Component.registerHooks(['head']);

@Component({
    name: 'registration',
    layout: 'auth',
    components: {
        BaseButton,
        BaseText,
        BaseInput,
        IconHiddenEye,
    },
    middleware: [authorizated],
})
export default class AuthPage extends Vue {
    data = {
        email: '',
        password: '',

    };

    icons = {
        eye: mdiEye,
    };

    typePasswordInput = 'password';

    // eslint-disable-next-line class-methods-use-this
    head() {
        return {
            title: 'Регистрация на сайте',
        };
    }

    showPassword() {
        if (this.data?.password) {
            this.typePasswordInput = 'text';

            setTimeout(() => { this.typePasswordInput = 'password'; }, 2000);
        }
    }

    async registrationUser() {
        try {
            const transmittedData = this.data;
            const response = await registration(transmittedData);

            if (response.status === 200) {
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: 'Успешно',
                    text: response.data,
                });

                setTimeout(() => this.$router.push('/auth/'), 2000);
            }
        } catch (e) {
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

.button {
    margin-top: 10px;
}

@media screen and (max-width: @md) {
    .auth {
        width: 80%;
    }
}

</style>
