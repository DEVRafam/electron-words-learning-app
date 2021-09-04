<template>
    <div>
        <SuspenseComponentWrapper></SuspenseComponentWrapper>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SuspenseComponentWrapper from "@/components/statistics/certain_datasets/SuspenseComponentWrapper.vue";

export default defineComponent({
    components: { SuspenseComponentWrapper },
});
</script>
