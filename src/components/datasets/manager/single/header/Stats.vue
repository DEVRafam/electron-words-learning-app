<template>
    <div class="content">
        <ul>
            <!--  -->
            <!-- Existing dataset -->
            <!--  -->
            <template v-if="!isDatasetJustCreated">
                <!-- CURRENT WORDS -->
                <li v-if="!datasetCurrentWords"><span>Loading words...</span></li>
                <li v-else>
                    <span>Current words amount: </span>
                    <strong>{{ datasetCurrentWords.length }}</strong>
                </li>
                <!--  -->
                <li>
                    <span>New words amount: </span>
                    <strong>{{ newWords.length }}</strong>
                </li>
                <li>
                    <span>Deleting words amount: </span>
                    <strong>{{ wordsToDelete.length }}</strong>
                </li>
                <li>
                    <span>Restoring words amount: </span>
                    <strong>{{ wordsToRestore.length }}</strong>
                </li>
            </template>
        </ul>
    </div>
</template>

<script lang="ts">
// Tools
import { defineComponent } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

export default defineComponent({
    setup() {
        const { wordsToDelete, newWords, datasetCurrentWords, wordsToRestore } = useWordsManager;
        const { isDatasetJustCreated } = useModifier;
        //
        return { datasetCurrentWords, wordsToDelete, newWords, wordsToRestore, isDatasetJustCreated };
    },
});
</script>
