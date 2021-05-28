<template>
    <div class="home">
        <h1>This is home page</h1>
        <img alt="Vue logo" src="../assets/logo.png" />
        <!--  -->
        <Sandbox></Sandbox>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sandbox from "@/components/Sandbox.vue";

export default defineComponent({
    name: "Home",
    components: {
        Sandbox,
    },
});
</script>
