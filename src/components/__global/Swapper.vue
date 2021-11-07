<template>
    <div class="global-component-swapper">
        <div
            class="swapper-containter"
            v-bind="{
                id: COMPONENT_ID,
                style: [...constainerSizes, containderDisplay, containerTransition, ...containterFlex],
            }"
        >
            <!--  -->
            <slot name="default"></slot>
            <!--  -->
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, onMounted, ref, watch } from "vue";

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
        spacing: {
            type: Number as PropType<number>,
            default: 20,
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
                const pixels = (props.spacing * (swapperItems.value.length - 1)) / swapperItems.value.length;
                item.style[__majorStyle] = `calc(${100 / swapperItems.value.length}% - ${pixels}px)`;
                item.style[__secondaryStyle] = `100%`;
            });
            setTimeout(() => (__phase.value = "loaded"), 1);
            //
            watch(
                () => props.currentIndex,
                (val) => {
                    if (swapperItems.value[val].classList.contains("swapper-item-active")) return;
                    swapperItems.value[val].classList.add("swapper-item-active");
                },
                {
                    immediate: true,
                }
            );
        });

        const constainerSizes = computed<string[]>(() => {
            const { length } = swapperItems.value;
            return [
                `${__majorStyle}: calc(${length * 100}% + ${props.spacing * (length - 1)}px)`, //
                `${__secondaryStyle}: 100%`,
            ];
        });
        const containderDisplay = computed<string>(() => {
            return __phase.value !== "loaded" ? "none" : "flex";
        });
        const containerTransition = computed<string>(() => {
            const axis: "X" | "Y" = __majorStyle == "width" ? "X" : "Y";
            const percentages = (100 * props.currentIndex) / swapperItems.value.length;
            // if (swapperItems.value.length === 2) {
            const pixels = (props.currentIndex * (props.spacing * (swapperItems.value.length - 1))) / swapperItems.value.length;
            return `transform: translate${axis}(calc(-${percentages}% - ${swapperItems.value.length === 2 ? pixels : pixels / 2}px))`;
            // }

            //
            // return `transform: translate${axis}(calc(-${percentages}%))`;
        });
        const containterFlex = computed<string[]>(() => {
            if (props.orientation === "horizontal") {
                return ["flex-direction: row", "justify-content: space-between"];
            } else {
                return ["flex-direction: column", "justify-content: space-between"];
            }
        });
        return { COMPONENT_ID, constainerSizes, containderDisplay, containerTransition, containterFlex };
    },
});
</script>
