<template>
    <template v-if="word.type !== 'irregular'">
        <ExpectedHelper :expected="word.expected" target="archived"></ExpectedHelper>
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
import type { ArchivedWord } from "@/types/Word";
// Components
import ExpectedHelper from "@/components/datasets/manager/single/modify/words/__utils/table_cells/Expected.vue";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<ArchivedWord>,
            required: true,
        },
    },
    components: { ExpectedHelper },
});
</script>
