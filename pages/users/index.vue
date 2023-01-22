<template>
    <div class="users" >
        <ul>
        <li v-for="(item, index) in users" :key="index">
            <p @dblclick="routeToCurrentUser(item.id)">{{item}}</p>
        </li>
        </ul>
    </div>
</template>

<script lang="ts">

import { Vue } from 'vue-property-decorator';
</script>