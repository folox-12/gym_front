<template>
    <div class="layout">
        <sticky-header
            transperent
        />
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
    name: 'LandingLayout',
    components: {
        StickyHeader,
    },
};

</script>

<style lang="less" scoped>
</style>
