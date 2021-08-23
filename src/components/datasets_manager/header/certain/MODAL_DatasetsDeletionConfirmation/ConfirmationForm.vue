<template>
    <div class="confirmation-form">
        <span class="bg-shape"></span>
        <span class="bg-shape"></span>
        <span class="bg-shape"></span>
        <span class="bg-shape"></span>
        <span class="bg-shape"></span>
        <font-awesome-icon icon="globe-europe" class="globe"></font-awesome-icon>
        <!--  -->
        <h2>Are you sure?</h2>
        <!--  -->
        <span class="consequences">
            <span>Despite all words, gameplay's logs and progress will be removed either</span>
            <strong> irrevocably</strong>
        </span>
        <!--  -->
        <label for="dataset-delete-confirmation">
            <span>Please write "</span>
            <strong>{{ datasetToModify.fileName }}</strong>
            <span>" to confirm your intention</span>
        </label>
        <!--  -->
        <div class="input-wrap">
            <input type="text" id="dataset-delete-confirmation" v-model="usersConfirmation" placeholder="Declare..." @focus="inputIsFocused = true" @blur="inputIsFocused = false" :maxlength="maxlength" :tabindex="tabindex" />
        </div>
        <!--  -->
        <footer>
            <button @click="handleDeletion" :disabled="blockDeleteAction" :tabindex="tabindex">I'm sure</button>
            <button @click="closeModal" :tabindex="tabindex">Return</button>
        </footer>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useDatasetDeletionModal from "./useDatasetDeletionModal";
import useModifier from "@/composable/datasets_manager/useModifier";
export default defineComponent({
    setup() {
        const { blockDeleteAction, handleDeletion, usersConfirmation, inputIsFocused, closeModal, deletionOperationProgress } = useDatasetDeletionModal;
        const { datasetToModify } = useModifier;
        //
        const maxlength = computed<number>(() => {
            return datasetToModify.value?.fileName.length || 20;
        });
        const tabindex = computed<1 | -1>(() => {
            return deletionOperationProgress.value === "formStage" ? 1 : -1;
        });

        return { datasetToModify, blockDeleteAction, handleDeletion, usersConfirmation, inputIsFocused, closeModal, maxlength, tabindex };
    },
});
</script>
