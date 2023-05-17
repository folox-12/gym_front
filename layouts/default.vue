<template>
    <div class="layout">
        <sticky-header />
        <main>
            <Nuxt />
            <notifications group="server-response" />
        </main>
        <portal-target name="modal" />
        <portal-target name="mobile" />
    </div>
</template>

<script>
import StickyHeader from '@/components/StickyHeader.vue';

export default {
    name: 'DefaultLayout',
    components: {
        StickyHeader,
    },
};

</script>
<style lang="less">
    main { margin-top: 100px; }
</style>
