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

        <Slider
            v-bind="{
                sliderIndex,
            }"
            v-on="{
                'change-slider-index': (val) => (sliderIndex = val),
                'increase-slider-index': increaseSliderIndex,
                'decrease-slider-index': decreaseSliderIndex,
            }"
        >
            <template v-for="(gameplay, index) in dataToPreview" :key="index">
                <Dataset
                    v-bind="{
                        gameplay,
                        index,
                        blocked: isGameplayBlocked(gameplay),
                        style: `width: ${100 / dataToPreview.length}%`,
                        sliderIndex,
                    }"
                    v-on="{
                        click: () => triggerCallback(gameplay),
                        callback: () => triggerCallback(gameplay),
                        focus: () => (focusingElement = gameplay),
                        blur: () => (focusingElement = null),
                    }"
                >
                </Dataset>
            </template>
        </Slider>

        <footer>
            <slot name="default"></slot>
            <router-link to="/" tabindex="-1"><span>Return</span></router-link>
        </footer>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import useLoader from "@/composable/datasets_loaders/useDatasetsLoader";
import useKeydown from "@/composable/useKeydown";
// Types
import { DatasetFileForPreview } from "@/types/Dataset";
// Components
import Slider from "./Slider.vue";
import Dataset from "./single_dataset/Dataset.vue";
//
export default defineComponent({
    props: {
        callback: {
            required: true,
            type: Function as PropType<(e: DatasetFileForPreview) => unknown>,
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
    components: { Dataset, Slider },
    async setup(props) {
        const { dataToPreview, loadGameplayFilesForPreview, distinguishGameplaysWithBlockedStatistics, gameplaysWithBlockedStatistics } = useLoader;
        const focusingElement = ref<DatasetFileForPreview | null>(null);
        // Slider
        const sliderIndex = ref<number>(0);
        const increaseSliderIndex = () => sliderIndex.value < dataToPreview.value.length - 3 && sliderIndex.value++;
        const decreaseSliderIndex = () => sliderIndex.value && sliderIndex.value--;
        //
        const isGameplayBlocked = (gameplay: DatasetFileForPreview) => {
            if (!props.enableBlocking) return false;
            return gameplaysWithBlockedStatistics.value.includes(gameplay.fileName);
        };
        const triggerCallback = (gameplay: DatasetFileForPreview) => {
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
            {
                key: "ArrowRight",
                fn: increaseSliderIndex,
            },
            {
                key: "ArrowLeft",
                fn: decreaseSliderIndex,
            },
        ]);
        await loadGameplayFilesForPreview();
        await distinguishGameplaysWithBlockedStatistics();

        return { dataToPreview, focusingElement, triggerCallback, isGameplayBlocked, sliderIndex, increaseSliderIndex, decreaseSliderIndex };
    },
});
</script>
