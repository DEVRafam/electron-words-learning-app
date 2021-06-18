<template>
    <footer id="datasets-manager-footer">
        <div id="footer-swap" :class="{ active: previewModifySection }">
            <div class="swap-item">
                <router-link to="/"><span>Back</span></router-link>
            </div>
            <div class="swap-item">
                <button class="save" :disabled="blockSaveButton">Save</button>
                <button class="discard" @click="previewModifySection = false">Discard</button>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
//
export default defineComponent({
    setup() {
        const { previewModifySection, blockSaveButton } = useModifier;
        return { previewModifySection, blockSaveButton };
    },
});
</script>
