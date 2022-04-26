<template>
    <select v-model="type" v-bind="$attrs">
        <option value="all">All</option>
        <option value="pair">Pair</option>
        <option value="image">Image</option>
        <option value="irregular">Irregular</option>
    </select>
    <button class="clear" v-bind="$attrs" @click="type = 'all'" :disabled="type === 'all'">X</button>
</template>

<script lang="ts">
// Tools
import { defineComponent } from "vue";
// Composable
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

export default defineComponent({
    inheritAttrs: false,
    setup() {
        const { type } = useWordsManager.tableFilters.current;
        return { type };
    },
});
</script>
