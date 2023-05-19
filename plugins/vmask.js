import Vue from 'vue';
import VueMask from 'v-mask';

Vue.use(VueMask, {
    placeholders: {
        Я: /[\wа-яА-Я]/, // cyrillic letter as a placeholder
    },
});
