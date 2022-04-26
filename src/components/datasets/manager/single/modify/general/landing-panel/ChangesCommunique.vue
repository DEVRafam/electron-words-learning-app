<template>
    <span class="changes-communique" :class="{ active: targetedElementHasChanged }" v-if="!isDatasetJustCreated">
        <span class="explanation">Changed</span>
        <button tabindex="-1" @click="$emit('undo')">
            <font-awesome-icon icon="undo-alt"></font-awesome-icon>
        </button>
    </span>
</template>

<script lang="ts">
// Tools
import { defineComponent, PropType, computed } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    props: {
        target: {
            type: String as PropType<"title" | "description" | "icon" | "fancyLetters" | "pronunciationLanguage">,
            required: true,
        },
    },
    // eslint-disable-next-line vue/no-setup-props-destructure
    setup({ target }) {
        const { datasetToModify, isDatasetJustCreated } = useModifier;

        const targetedElementHasChanged = computed<boolean>(() => {
            if (datasetToModify.value === null) return false;
            //
            if (target === "icon") {
                const { customIcon, iconName } = useModifier.useGeneralInformations;
                return !!customIcon.value || iconName.value !== datasetToModify.value.icon;
            }
            //
            else if (target === "fancyLetters") {
                const { fancyLetters } = useModifier.useGeneralInformations;
                return JSON.stringify(fancyLetters.value) != JSON.stringify(datasetToModify.value?.fancyLetters);
            }
            //
            else if (target === "pronunciationLanguage") {
                return useModifier.useGeneralInformations.language.value !== datasetToModify.value.pronunciationLanguage;
            }
            // for title and description
            return useModifier.useGeneralInformations[target].value !== datasetToModify.value[target];
        });

        return { targetedElementHasChanged, isDatasetJustCreated };
    },
});
</script>
