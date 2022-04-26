<template>
    <button class="nav-btn" @click="click" tabindex="-1">
        <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
        <span>Menu</span>
    </button>
</template>
<script lang="ts">
// Tools
import router from "@/router/index";
import { defineComponent } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";
//
export default defineComponent({
    setup() {
        const { nothingHasBeenChanged, displayExitModal } = useModifier;

        const click = () => {
            if (nothingHasBeenChanged.value) router.push({ path: "/" });
            else displayExitModal.value = "menu";
        };
        //
        return { click };
    },
});
</script>
