<template>
    <div class="global-component-swapper">
        <div
            class="swapper-containter"
            v-bind="{
                id: COMPONENT_ID,
                style: [...constainerSizes, containderDisplay, containerTransition, containterFlexDirection],
            }"
        >
            <!--  -->
            <slot name="default"></slot>
            <!--  -->
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, onMounted, ref } from "vue";

export default defineComponent({
    props: {
        currentIndex: {
            type: Number as PropType<number>,
            required: true,
        },
        orientation: {
            type: String as PropType<"horizontal" | "vertical">,
            default: "horizontal",
        },
    },
    setup(props) {
        const __phase = ref<"loaded" | "loading">("loading");
        const __majorStyle: "width" | "height" = props.orientation.includes("horizontal") ? "width" : "height";
        const __secondaryStyle: "width" | "height" = __majorStyle === "width" ? "height" : "width";
        const swapperItems = ref<HTMLElement[]>([]);
        const COMPONENT_ID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        onMounted(() => {
            const swapperItemsWrapper = document.getElementById(COMPONENT_ID) as HTMLElement;
            swapperItems.value = [...swapperItemsWrapper.children] as HTMLElement[];
            swapperItems.value.forEach((item) => {
                item.classList.add("swapper-item");
                item.style[__majorStyle] = `${100 / swapperItems.value.length}%`;
                item.style[__secondaryStyle] = `100%`;
            });
            setTimeout(() => (__phase.value = "loaded"), 1);
        });

        const constainerSizes = computed<string[]>(() => {
            return [
                `${__majorStyle}: ${swapperItems.value.length * 100}%`, //
                `${__secondaryStyle}: 100%`,
            ];
        });
        const containderDisplay = computed<string>(() => {
            return __phase.value !== "loaded" ? "none" : "flex";
        });
        const containerTransition = computed<string>(() => {
            const axis: "X" | "Y" = __majorStyle == "width" ? "X" : "Y";
            return `transform: translate${axis}(-${(100 * props.currentIndex) / swapperItems.value.length}%)`;
        });
        const containterFlexDirection = computed<string>(() => {
            return `flex-direction: ${props.orientation === "horizontal" ? "row" : "column"}`;
        });
        return { COMPONENT_ID, constainerSizes, containderDisplay, containerTransition, containterFlexDirection };
    },
});
</script>
