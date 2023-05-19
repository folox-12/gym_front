<template>
    <div class="home-page">
        <landing-section
            title="Веб-приложениe для формирования и размещения программ тренировок"
            image="/img/landing/1.png"
            text-left
        />
        <landing-section
            title="Регистрация и авторизация"
            description="Использование приложения возможно как для зарегистрированных пользователей, так и для пользователей без регистрации. Для регистрации достаточно заполнить анкету и подтвердить ее по ссылке в электронной почте"
            image="/img/landing/registration.png"
            dark
        />
        <landing-section
            title="Добавление тренировки в личный кабинет"
            description="Модуль подписки позволяет пользователю добавить выбранный комплекс в личный кабинет."
            image="/img/landing/registration.png"
            text-left
        />
        <landing-section
            title="Создания комплекса упражнений"
            description="Модуль позволяет авторизированным и верифицированным пользователям создавать свои уникальные программы"
            image="/img/landing/new_edit.png"
            dark
        />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { BaseMessage, BaseContainer } from '~/components/base';
import LandingSection from '~/components/LandingSection.vue';

Component.registerHooks(['head']);
@Component({
    name: 'mainPage',
    layout: 'landing',
    components: {
        BaseMessage,
        BaseContainer,
        LandingSection,
    },
})
export default class homePage extends Vue {
    header = 'Главная страница сайта';

    head() {
        return {
            title: this.header,
        };
    }
}
</script>
