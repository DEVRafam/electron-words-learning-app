<template>
    <section id="select-gameplay-dataset">
        <!--  -->
        <h1>
            <span class="background"> {{ label }}</span>
            <h2 class="label">
                <span>Select </span>
                <span class="color">dataset</span>
                <span> from below:</span>
            </h2>
        </h1>

        <section class="datasets" :class="{ scrollable: dataToPreview.length > 3 }">
            <template v-for="(gameplay, index) in dataToPreview" :key="index">
                <Dataset
                    v-bind="{
                        gameplay,
                        index,
                        blocked: isGameplayBlocked(gameplay),
                    }"
                    v-on="{
                        callback: () => triggerCallback(gameplay),
                        focus: () => (focusingElement = gameplay),
                        blur: () => (focusingElement = null),
                    }"
                >
                </Dataset>
            </template>
        </section>

        <footer>
            <slot name="default"></slot>
            <router-link to="/" tabindex="-1"><span>Return</span></router-link>
        </footer>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import useLoader from "@/composable/datasets_loaders/useDatasetsLoader";
import { GameplayDataFileForPreview } from "@/types/Gameplay";
import useKeydown from "@/composable/useKeydown";
//
import Dataset from "./Dataset.vue";
//
export default defineComponent({
    props: {
        callback: {
            required: true,
            type: Function as PropType<(e: GameplayDataFileForPreview) => unknown>,
        },
        label: {
            required: true,
            type: String as PropType<string>,
        },
        enableBlocking: {
            default: false,
            type: Boolean as PropType<boolean>,
        },
    },
    components: { Dataset },
    async setup(props) {
        const { dataToPreview, loadGameplayFilesForPreview, gameplaysIconPathResolver, distinguishGameplaysWithBlockedStatistics, gameplaysWithBlockedStatistics } = useLoader;
        const focusingElement = ref<GameplayDataFileForPreview | null>(null);

        const isGameplayBlocked = (gameplay: GameplayDataFileForPreview) => {
            if (!props.enableBlocking) return false;
            return gameplaysWithBlockedStatistics.value.includes(gameplay.fileName);
        };
        const triggerCallback = (gameplay: GameplayDataFileForPreview) => {
            if (isGameplayBlocked(gameplay)) return;
            props.callback(gameplay);
        };

        useKeydown([
            {
                key: "Enter",
                fn: () => {
                    if (focusingElement.value) triggerCallback(focusingElement.value);
                },
            },
        ]);
        await loadGameplayFilesForPreview();
        await distinguishGameplaysWithBlockedStatistics();

        return { dataToPreview, gameplaysIconPathResolver, focusingElement, triggerCallback, isGameplayBlocked };
    },
});
</script>
