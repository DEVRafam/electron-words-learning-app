<template>
    <div>
        <SuspenseComponentWrapper></SuspenseComponentWrapper>
        <router-link to="/">Back</router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SuspenseComponentWrapper from "@/components/statistics/certain_datasets/SuspenseComponentWrapper.vue";

export default defineComponent({
    components: { SuspenseComponentWrapper },
});
</script>
