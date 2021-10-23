<template>
    <section id="games-history" ref="wrapper">
        <template v-for="(item, index) in gamesHistory" :key="index">
            <SingleLog :index="index" :logFile="item"></SingleLog>
        </template>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from "vue";
import SingleLog from "@/components/statistics/certain_datasets/left_side/games_history/single_log/SingleLog.vue";
import { gamesHistory } from "@/composable/statistics/certain/useCertain";

export default defineComponent({
    components: { SingleLog },
    props: {
        currentIndex: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
    },
    setup(props) {
        const wrapper = ref<HTMLElement | null>(null);
        watch(props, () => {
            if (wrapper.value) wrapper.value.scrollTop = 0;
        });
        return { gamesHistory, wrapper };
    },
});
</script>
