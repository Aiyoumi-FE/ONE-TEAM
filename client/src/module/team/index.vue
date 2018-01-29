<template>
    <div v-if="!$route.meta.inDefault" class="content">
        <router-view></router-view>
    </div>
    <div v-else>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'team'
}
</script>
