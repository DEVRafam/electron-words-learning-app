<template>
    <span id="datasets-deletion-confirmation" :class="[status, { inputIsFocused }]">
        <div class="bg-img" :style="iconBackgroundImage"></div>
        <!--  -->
        <div class="content">
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
                <input type="text" id="dataset-delete-confirmation" v-model="usersConfirmation" placeholder="Declare..." @focus="inputIsFocused = true" @blur="inputIsFocused = false" :maxlength="datasetToModify.fileName.length" />
                <button @click="inputClear" :disabled="usersConfirmation.length < 3">X</button>
            </div>
            <!--  -->
            <footer>
                <button :disabled="blockDeleteAction">I'm sure</button>
                <button @click="() => $emit('close-modal')">Return</button>
            </footer>
        </div>
        <!--  -->
    </span>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    props: {
        status: {
            type: String as PropType<"hidden" | "visible" | "fading">,
            required: true,
        },
    },
    emits: ["close-modal"],
    setup() {
        const { datasetToModify, useGeneralInformations } = useModifier;
        const { iconBackgroundImage } = useGeneralInformations;
        const usersConfirmation = ref<string>("");
        const blockDeleteAction = computed<boolean>(() => {
            return usersConfirmation.value !== datasetToModify.value?.fileName;
        });
        const inputIsFocused = ref<boolean>(false);
        const inputClear = () => {
            usersConfirmation.value = "";
            document.getElementById("dataset-delete-confirmation")?.focus();
        };

        return { datasetToModify, usersConfirmation, blockDeleteAction, inputIsFocused, inputClear, iconBackgroundImage };
    },
});
</script>
