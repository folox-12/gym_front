<template>
    <div class="gm-loader">
        <base-icon
            class="gm-loader-icon"
            :path="icon"
            color="basic"
            width="48"
            height="48"
           />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { mdiLoading } from "@mdi/js"
import BaseIcon from "./Icon.vue";

@Component({
    components: {
        BaseIcon,
    },
})
export default class Loader extends Vue {
    icon = mdiLoading
}
</script>

<style scoped>
@keyframes round_rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.gm-loader-icon {
    min-height: 48px;
    animation-duration: .7s;
    animation-name: round_rotate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}
.gm-loader {
    text-align: center;
    padding-block: 30px;
}
</style>
