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
import { defineComponent, PropType, computed } from "vue";
import { ArchivedWord } from "@/types/Word";
import DisplayedHelper from "@/components/datasets_manager/modify/words/__utils/table_cells/Displayed.vue";
import { wordsImagePathResolver } from "@/composable/datasets_loaders/useDatasetsLoader";
import useModifier from "@/composable/datasets_manager/useModifier";

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
