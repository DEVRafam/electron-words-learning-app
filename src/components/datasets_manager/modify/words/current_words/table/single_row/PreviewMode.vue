<template>
    <Expected :expected="word.expected" target="current"></Expected>
    <Displayed :displayed="word.displayed" target="current"></Displayed>
    <slot name="default"></slot>
    <td class="center actions">
        <DeleteButton :word="word"></DeleteButton>
        <button class="edit" @click="$emit('toggle-edit-mode')" tabindex="-1">Edit</button>
    </td>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CurrentWord from "@/classes/CurrentWord";

import DeleteButton from "./DeleteButton.vue";
import Expected from "@/components/datasets_manager/modify/words/__utils/table_cells/Expected.vue";
import Displayed from "@/components/datasets_manager/modify/words/__utils/table_cells/Displayed.vue";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<CurrentWord>,
            required: true,
        },
    },
    emits: ["toggle-edit-mode"],
    components: { Expected, Displayed, DeleteButton },
});
</script>
