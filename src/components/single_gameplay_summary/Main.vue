<template>
    <section id="single-gameplay-summary">
        <SummaryHeaderRow></SummaryHeaderRow>
        <UsersAnswersRow></UsersAnswersRow>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { loadLogFile, data } from "@/composable/single_gameplay_summary/useSummary";
import { useRoute, useRouter } from "vue-router";
//
import UsersAnswersRow from "@/components/single_gameplay_summary/users_answers/UsersAnswersRow.vue";
import SummaryHeaderRow from "@/components/single_gameplay_summary/SummaryHeaderRow.vue";
//
export default defineComponent({
    components: { SummaryHeaderRow, UsersAnswersRow },
    async setup() {
        const router = useRouter();
        const route = useRoute();
        const logFileName = route.params.logFileName as string;
        //
        const status = await loadLogFile(logFileName);
        if (!status) return router.push({ path: "/" });
        //
        return { data };
    },
});
</script>
