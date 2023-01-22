<template>
    <div class="currentUser">
        <li v-for="(item, index) in user" :key="index">{{item}}</li>   
    </div>
</template>
<script lang="ts">
import { Vue, Component, Mixins } from 'vue-property-decorator';
</script>
<style lang="less" module>

</style>