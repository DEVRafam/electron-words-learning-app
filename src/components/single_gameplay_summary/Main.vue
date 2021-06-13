<template>
    <section id="single-gameplay-summary">
        <SummaryHeaderRow></SummaryHeaderRow>
        <UsersAnswersRow></UsersAnswersRow>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useSummary from "@/composable/single_gameplay_summary/useSummary";
//
import UsersAnswersRow from "@/components/single_gameplay_summary/users_answers/UsersAnswersRow.vue";
import SummaryHeaderRow from "@/components/single_gameplay_summary/SummaryHeaderRow.vue";
//
export default defineComponent({
    components: { SummaryHeaderRow, UsersAnswersRow },
    async setup() {
        const { loadLogFile, data } = useSummary;
        await loadLogFile();

        return { data };
    },
});
</script>
