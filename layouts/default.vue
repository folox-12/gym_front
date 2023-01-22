<template>
    <div class="layout">
        <sticky-header />
        <main>
            <Nuxt />
            <notifications group="server-response" />
        </main>
    </div>
</template>

<script>
import StickyHeader from '@/components/StickyHeader.vue';

export default {
    name: 'default',
    components: {
        StickyHeader
    }
};

</script>
<style lang="less">
    main { margin-top: 100px; }
</style>
