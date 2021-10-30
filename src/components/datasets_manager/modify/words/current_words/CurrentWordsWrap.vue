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
import { defineComponent, ref, watch } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
import CurrentWordsTable from "@/components/datasets_manager/modify/words/current_words/table/CurrentWordsTable.vue";

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
