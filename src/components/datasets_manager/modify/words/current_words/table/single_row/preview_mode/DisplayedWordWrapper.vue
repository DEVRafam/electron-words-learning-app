<template>
    <template v-if="word.type === 'pair' || word.type === 'irregular'">
        <DisplayedHelper :displayed="word.displayed" target="current">
            <div class="button-wrap">
                <button class="undo" :disabled="blockButton" @click="reset">
                    <font-awesome-icon icon="undo-alt"></font-awesome-icon>
                </button>
            </div>
        </DisplayedHelper>
    </template>
    <!--  -->
    <template v-else-if="word.type === 'image'">
        <td class="displayed image" :style="`background-image: url(${imageURL})`">
            <div class="button-wrap">
                <button class="undo" :disabled="blockButton" @click="reset" tabindex="-1">
                    <font-awesome-icon icon="undo-alt"></font-awesome-icon>
                </button>
                <button @click="() => (openModal = true)" tabindex="-1"><font-awesome-icon icon="eye"></font-awesome-icon></button>
            </div>
        </td>
        <!--  -->
        <PreviewImage v-if="openModal" :imageURL="imageURL" @exit="() => (openModal = false)"></PreviewImage>
    </template>
</template>

<script lang="ts">
import { ref, computed, defineComponent, PropType } from "vue";
import CurrentWord from "@/classes/CurrentWord";
import { wordsImagePathResolver } from "@/composable/datasets_loaders/useDatasetsLoader";
import useModifier from "@/composable/datasets_manager/useModifier";

import PreviewImage from "@/components/datasets_manager/modify/words/__utils/PreviewImage.vue";
import DisplayedHelper from "@/components/datasets_manager/modify/words/__utils/table_cells/Displayed.vue";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<CurrentWord>,
            required: true,
        },
    },
    emits: ["toggle-edit-mode"],
    components: { DisplayedHelper, PreviewImage },
    setup(props) {
        const { datasetToModify } = useModifier;
        const openModal = ref<boolean>(false);
        const blockButton = computed<boolean>(() => {
            return !props.word.hasBeenModified("displayed");
        });
        const reset = () => props.word.resetProperty("displayed");
        const imageURL = computed<string>(() => {
            if (props.word._image) return `${props.word.displayed}`;
            else {
                const datasetsName = datasetToModify.value?.fileName as string;
                return wordsImagePathResolver(datasetsName, props.word);
            }
        });

        return { blockButton, reset, imageURL, openModal };
    },
});
</script>
