<template>
    <base-icon
        class="gm-loading"
        :path="icon"
        color="basic"
        width="48"
        height="48"
   />
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

.gm-loading {
    min-height: 48px;
    animation-duration: .7s;
    animation-name: round_rotate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}
</style>
