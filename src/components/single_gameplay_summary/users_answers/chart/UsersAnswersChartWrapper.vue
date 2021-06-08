<template>
    <section id="answers-chart" class="field big-padding">
        <Chart type="pie" :data="data.answers" id="users-answers-chart"></Chart>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { loadData, data } from "@/composable/single_gameplay_summary/loadData";
import { useRoute, useRouter } from "vue-router";
//
import Chart from "@/components/single_gameplay_summary/users_answers/chart/Chart.vue";
//
export default defineComponent({
    components: { Chart },
    async setup() {
        const router = useRouter();
        const route = useRoute();
        const logFileName = route.params.logFileName as string;
        //
        const status = await loadData(logFileName);
        if (!status) return router.push({ path: "/" });
        //
        return { data };
    },
});
</script>
