<template>
    <button class="nav-btn" @click="click" tabindex="-1">
        <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
        <span>Menu</span>
    </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
import router from "@/router/index";
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
