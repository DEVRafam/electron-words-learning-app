<template>
    <button @click="handleClick" :disabled="disableButton" class="extend-compress">{{ buttonText }}</button>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
import useKeydown from "@/composable/useKeydown";

export default defineComponent({
    setup() {
        const { extendCurrentWordsSection } = useModifier;
        const disableButton = ref<boolean>(false);
        const handleClick = () => {
            extendCurrentWordsSection.value = !extendCurrentWordsSection.value;
            disableButton.value = true;

            setTimeout(() => {
                disableButton.value = false;
            }, 1000);
        };
        const buttonText = computed<"Extend" | "Compress">(() => {
            return extendCurrentWordsSection.value ? "Compress" : "Extend";
        });

        useKeydown([
            {
                key: "e",
                fn: handleClick,
                ctrl: true,
            },
        ]);

        return { handleClick, disableButton, buttonText };
    },
});
</script>
