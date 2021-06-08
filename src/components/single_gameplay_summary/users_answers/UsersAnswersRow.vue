<template>
    <div class="row">
        <div class="column">
            <Statistics></Statistics>
        </div>
        <!--  -->
        <div class="column">
            <UsersAnswersChartWrapper></UsersAnswersChartWrapper>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//
import UsersAnswersChartWrapper from "@/components/single_gameplay_summary/users_answers/chart/UsersAnswersChartWrapper.vue";
import Statistics from "@/components/single_gameplay_summary/users_answers/Statistics.vue";
//
export default defineComponent({
    components: { UsersAnswersChartWrapper, Statistics },
});
</script>
