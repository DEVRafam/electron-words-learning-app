<template>
    <section id="slider-and-sides-navigation-wrapper">
        <!--  -->
        <template v-if="displayNavigationTools">
            <button id="left-arrow" tabindex="-1" @click="$emit('decrease-slider-index')" :disabled="sliderIndex === 0">
                <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </button>
            <button id="right-arrow" tabindex="-1" @click="$emit('increase-slider-index')" :disabled="sliderIndex === amountOfDatasets - 3">
                <font-awesome-icon icon="chevron-right"> </font-awesome-icon>
            </button>
        </template>
        <!--  -->
        <div id="slider-wrapper">
            <div id="datasets-swapping-area" :style="[sliderWidth, sliderTransition]">
                <slot name="default"></slot>
            </div>
        </div>
    </section>

    <nav id="slider-manager" v-if="displayNavigationTools">
        <template tabindex="-1" v-for="(_, index) in amountOfDatasets - 2" :key="index">
            <button
                v-bind="{
                    class: { active: sliderIndex === index },
                    tabindex: -1,
                    style: `animation: fade-only-opacity .3s ${0.1 * index + 0.3}s both`,
                }"
                v-on="{
                    click: () => $emit('change-slider-index', index),
                }"
            ></button>
        </template>
    </nav>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import useLoader from "@/composable/datasets_loaders/useDatasetsLoader";

export default defineComponent({
    props: {
        sliderIndex: {
            type: Number as PropType<number>,
            required: true,
        },
    },
    emits: ["change-slider-index", "increase-slider-index", "decrease-slider-index"],
    setup(props) {
        const { length: amountOfDatasets } = useLoader.dataToPreview.value;
        const sliderWidth = computed<string>(() => `width: ${(amountOfDatasets * 100) / 3}%`);
        const sliderTransition = computed<string>(() => {
            if (amountOfDatasets < 3) return `transform: translateX(-50%);left: 50%`;

            const translate = (100 / amountOfDatasets) * props.sliderIndex;
            return `transform: translateX(-${translate}%)`;
        });
        const displayNavigationTools = computed<boolean>(() => {
            return amountOfDatasets > 3;
        });
        //
        return { sliderWidth, sliderTransition, amountOfDatasets, displayNavigationTools };
    },
});
</script>
