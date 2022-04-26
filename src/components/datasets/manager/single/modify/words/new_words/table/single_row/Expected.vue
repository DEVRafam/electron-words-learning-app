<template>
    <template v-if="word.type !== 'irregular'">
        <td class="expected">
            {{ word.expected }}
        </td>
    </template>
    <!--  -->
    <template v-else>
        <td class="expected irregular">
            <span v-for="(item, index) in JSON.parse(word.expected)" :key="index" class="irrgegular-form">
                <strong>{{ index + 1 }}-</strong> <span>{{ item }}</span>
            </span>
        </td>
    </template>
</template>

<script lang="ts">
// Tools
import { defineComponent, PropType } from "vue";
// Types
import type { NewWord } from "@/types/Word";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<NewWord>,
            required: true,
        },
    },
});
</script>
