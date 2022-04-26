<template>
    <template v-if="word.type !== 'image'">
        <DisplayedHelper :displayed="word.displayed" target="archived"></DisplayedHelper>
    </template>
    <!--  -->
    <template v-else>
        <td class="displayed image" :style="`background-image: url(${imageURL})`"></td>
    </template>
</template>

<script lang="ts">
// Tools
import { defineComponent, PropType, computed } from "vue";
// Types
import type { ArchivedWord } from "@/types/Word";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";
import { wordsImagePathResolver } from "@/composable/datasets_loaders/useDatasetsLoader";
// Components
import DisplayedHelper from "@/components/datasets/manager/single/modify/words/__utils/table_cells/Displayed.vue";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<ArchivedWord>,
            required: true,
        },
    },
    components: { DisplayedHelper },
    setup(props) {
        const { datasetToModify } = useModifier;
        const imageURL = computed<string>(() => {
            const datasetsName = datasetToModify.value?.fileName as string;
            return wordsImagePathResolver(datasetsName, props.word);
        });
        return { imageURL };
    },
});
</script>
