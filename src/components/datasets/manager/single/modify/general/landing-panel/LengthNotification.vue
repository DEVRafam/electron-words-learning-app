<template>
    <footer class="validation">
        <div class="communiques-wrapper">
            <span class="explanation" :class="{ active: isTooSmall }">The {{ target }} has to be at least {{ min }} characters long!</span>
            <span class="explanation" :class="{ active: isTooBig }">The {{ target }} can be up to {{ max }} characters long!</span>
        </div>
        <span class="length-notification" :class="CSSClass">{{ message }}</span>
    </footer>
</template>

<script lang="ts">
// Tools
import { defineComponent, PropType, computed } from "vue";
// Composable
import useGeneralInformations from "@/composable/datasets_manager/submodules/useGeneralInformations";

export default defineComponent({
    props: {
        target: {
            type: String as PropType<"title" | "description">,
            required: true,
        },
    },
    setup(props) {
        const { min, max } = useGeneralInformations.restrictions[props.target];
        const targetedElementLength = computed<number>(() => {
            return useGeneralInformations[props.target].value.length;
        });
        const isTooSmall = computed<boolean>(() => targetedElementLength.value < min);
        const isTooBig = computed<boolean>(() => targetedElementLength.value > max);

        const CSSClass = computed<Record<"invalid", boolean>>(() => ({ invalid: isTooSmall.value || isTooBig.value }));

        const message = computed<string>(() => {
            return `${targetedElementLength.value}/${max}`;
        });

        return { CSSClass, message, min, max, isTooSmall, isTooBig };
    },
});
</script>
