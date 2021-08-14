<template>
    <span id="redirect-home" @click="click">
        <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
        <span>Menu</span>
    </span>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router/index";
//
export default defineComponent({
    setup() {
        const click = () => router.push({ path: "/" });
        //
        return { click };
    },
});
</script>
