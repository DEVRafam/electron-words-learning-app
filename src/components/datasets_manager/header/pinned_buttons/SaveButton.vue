<template>
    <button class="save" :disabled="blockSaveButton" @click="saveChanges" tabindex="-1">
        <font-awesome-icon icon="save"></font-awesome-icon>
        <span>Save changes</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
import useKeydown from "@/composable/useKeydown";

export default defineComponent({
    setup() {
        const { blockSaveButton, saveChanges } = useModifier;
        useKeydown([
            {
                key: "s",
                fn: saveChanges,
                ctrl: true,
            },
        ]);
        //
        return { blockSaveButton, saveChanges };
    },
});
</script>
