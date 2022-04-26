<template>
    <section id="current-words" :class="{ transformAnimation: displayAnimation, extendedContent: loadExtendedContent }">
        <Suspense>
            <template #default>
                <CurrentWordsTable></CurrentWordsTable>
            </template>
            <!--  -->
            <template #fallback>
                <LoadingScreen></LoadingScreen>
            </template>
        </Suspense>
    </section>
</template>

<script lang="ts">
// Tools
import { defineComponent, ref, watch } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";
// Components
import CurrentWordsTable from "./table/CurrentWordsTable.vue";

export default defineComponent({
    components: { CurrentWordsTable },
    setup() {
        const { extendCurrentWordsSection, loadExtendedContent } = useModifier;
        const displayAnimation = ref<boolean>(false);

        watch(extendCurrentWordsSection, () => {
            displayAnimation.value = true;
            setTimeout(() => {
                displayAnimation.value = false;
            }, 1000);
        });
        return { displayAnimation, loadExtendedContent };
    },
});
</script>
