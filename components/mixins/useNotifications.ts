import { Component, Vue } from 'vue-property-decorator';

@Component
class useNotification extends Vue {
    createErrorNotification(text?: string) {
        this.$notify({
            group: 'server-response',
            type: 'error',
            title: 'Ошибка',
            text: text || 'Ошибка операции',
        });
    }

    createSuccessNotification(text?: string) {
        this.$notify({
            group: 'server-response',
            type: 'success',
            title: 'Успешно',
            text: text || 'Успешное выполнение операции',
        });
    }
}
// eslint-disable-next-line new-cap
export default new useNotification();
