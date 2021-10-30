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
import { defineComponent, PropType } from "vue";
import { ArchivedWord } from "@/types/Word";
import ExpectedHelper from "@/components/datasets_manager/modify/words/__utils/table_cells/Expected.vue";

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
