<template>
    <div class="home-page">
        <base-message
            v-if="$auth.loggedIn && !$auth.user.isActivated" 
            type="warning"
        >
            <base-text 
            >
                Для получения полного доступа к функционалу приложения пожалуйста подтвердитe аккаунт на почте {{ $auth.user.email }}, а затем перезайдите в систему.
            </base-text>
        </base-message>
        Home
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { BaseMessage } from '~/components/base'

Component.registerHooks(['head']);
@Component({
    name: "main",
    components: {
        BaseMessage,
    }
})
export default class homePage extends Vue {
    header = 'Главная страница сайта'

    head() {
        return {
            title: this.header,
            };
        }


}
</script>

<style lang="less">
</style>