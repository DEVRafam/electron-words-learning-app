<template>
    <section id="comparisons" class="field">
        <Header></Header>
        <section class="datasets">
            <Suspense v-if="openComparsionPanel">
                <template #default>
                    <Datasets></Datasets>
                </template>
                <!--  -->
                <template #fallback>
                    <LoadingScreen></LoadingScreen>
                </template>
            </Suspense>
        </section>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { openComparsionPanel } from "@/composable/statistics/certain/submodules/useComparisons";

import Header from "./Header.vue";
import Datasets from "./Datasets.vue";

export default defineComponent({
    components: { Header, Datasets },
    setup() {
        return { openComparsionPanel };
    },
});
</script>
