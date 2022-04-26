<template>
    <button class="pronunciation" @click="pronounce" :disabled="blockButton" tabindex="-1">
        <font-awesome-icon icon="volume-up"></font-awesome-icon>
    </button>
</template>

<script lang="ts">
// Tools
import { shell } from "electron";
import CurrentWord from "@/classes/CurrentWord";
import { defineComponent, PropType, computed } from "vue";
// Composable
import useGeneralInformations from "@/composable/datasets_manager/submodules/useGeneralInformations";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<CurrentWord>,
            required: true,
        },
    },
    setup(props) {
        const { language } = useGeneralInformations;

        const pronounce = () => {
            const { expected } = props.word;
            shell.openExternal(`https://www.google.com/search?q=how+to+pronounce+${expected}+in+${language.value}`);
        };
        const blockButton = computed<boolean>(() => {
            return props.word.hasBeenModified("expected") || language.value === false;
        });

        return { pronounce, blockButton };
    },
});
</script>
