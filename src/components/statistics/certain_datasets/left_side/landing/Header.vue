<template>
    <h1>{{ dataset.title }}</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useCertain from "@/composable/statistics/certain/useCertain";

export default defineComponent({
    setup() {
        const { dataset } = useCertain;

        return { dataset };
    },
});
</script>
