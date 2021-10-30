<template>
    <teleport to="section#modals-wrapper">
        <div class="image-preview">
            <button @click="$emit('exit')">Exit</button>
            <div class="img" :style="`background-image:url('${imageURL}')`"></div>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
    props: {
        imageURL: {
            type: String as PropType<string>,
            required: true,
        },
    },
    emits: ["exit"],
});
</script>
