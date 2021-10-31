<template>
    <Modal @close-modal="() => $emit('exit')" class="image-preview">
        <div class="img" :style="`background-image:url('${imageURL}')`"></div>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, onUnmounted } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

export default defineComponent({
    props: {
        imageURL: {
            type: String as PropType<string>,
            required: true,
        },
    },
    emits: ["exit"],
    setup() {
        onMounted(() => (useModifier.isAnyModalOpened.value = true));
        onUnmounted(() => (useModifier.isAnyModalOpened.value = false));
    },
});
</script>
