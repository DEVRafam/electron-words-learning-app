<template>
    <span id="there-is-no-image-selected">
        <font-awesome-icon icon="image"></font-awesome-icon>
        <h4>There is no selected icon <span class="color">yet</span></h4>
        <h2>Browse gallery</h2>
        <button @click="$emit('open-icons-selection-panel')" tabindex="1">Open</button>
    </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    emits: ["open-icons-selection-panel"],
    setup() {
        //
    },
});
</script>
