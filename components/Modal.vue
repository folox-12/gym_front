<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div v-on-clickaway="close" class="modal-container"
                    :class="ContainerClasses"
                >
                    <div class="modal-header">
                        <slot name="header"> Вы действительно хотите это сделать? </slot>
                    </div>
                    <div class="modal-body">
                        <div v-if="loading">
                            <base-loader />
                        </div>
                        <div v-else>
                            <slot name="body"/>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                            <base-button :disabled="loading" variant="simple" @click="confirm">
                                Да
                            </base-button>
                            <base-button :disabled="loading" variant="simple" @click="close">
                                Нет
                            </base-button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script lang="ts">
import { mixin as clickaway } from 'vue-clickaway';
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { BaseButton, BaseLoader } from "~/components/base"

enum WIDTH {
    SMALL = "small",
    MEDIUM = "medium",
    Large="large",
}

@Component({
    components: {
        BaseButton,
        BaseLoader,
    },

    mixins: [clickaway],
})
export default class Modal extends Vue {
    open = false;

    @Prop({
        type: String as () => WIDTH,
        validator: (value: WIDTH) => Object.values(WIDTH).includes(value),
        default: WIDTH.MEDIUM,
    }) readonly width?: WIDTH;

    @Prop({
        type: Boolean,
        default: false,
    }) readonly loading?: boolean;

    get ContainerClasses() {
        return {
            [`modal-container--${this.width}`]: this.width,
        };
    }

    @Emit("close")
    close() {}

    @Emit("confirm")
    confirm() {}
}
</script>
<style lang="less">
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 70%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;

    &--small{
        width: 30%;
    }

    &--medium{
        width: 50%;
    }

    &--large{
        width: 70%;
    }
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-footer {
    display: flex;
    gap: 10px;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
