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
                <div
                    class="single-gameplay-dataset"
                    tabindex="1"
                    :autofocus="index === 0"
                    v-on="{
                        click: () => callback(gameplay),
                        focus: () => (focusingElement = gameplay),
                        blur: () => (focusingElement = null),
                    }"
                >
                    <h3>{{ gameplay.title }}</h3>
                    <p>{{ gameplay.description }}</p>
                    <div class="icon" :style="gameplaysIconPathResolver(gameplay)"></div>
                    <strong class="amount-of-words">
                        <span>Amount of words: </span>
                        <span class="color">{{ gameplay.wordsAmount }}</span>
                    </strong>
                </div>
            </template>
        </section>

        <router-link to="/" tabindex="-1"><span>Return</span></router-link>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import useLoader from "@/composable/datasets_loaders/useDatasetsLoader";
import { GameplayDataFileForPreview } from "@/types/Gameplay";
import useKeydown from "@/composable/useKeydown";
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
    },
    async setup(props) {
        const { dataToPreview, loadGameplayFilesForPreview, gameplaysIconPathResolver, distinguishGameplaysWithBlockedStatistics } = useLoader;
        const focusingElement = ref<GameplayDataFileForPreview | null>(null);
        useKeydown([
            {
                key: "Enter",
                fn: () => {
                    if (focusingElement.value) {
                        props.callback(focusingElement.value);
                    }
                },
            },
        ]);
        await loadGameplayFilesForPreview();
        await distinguishGameplaysWithBlockedStatistics();

        return { dataToPreview, gameplaysIconPathResolver, focusingElement };
    },
});
</script>
