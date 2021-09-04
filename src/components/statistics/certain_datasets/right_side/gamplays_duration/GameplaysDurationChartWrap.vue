<template>
    <section id="duration-chart-wrap" class="field">
        <header>
            <h3 class="field-header">Gameplays duration [s]</h3>

            <div class="buttons-wrap">
                <button @click="refresh" class="refresh-chart" tabindex="-1">
                    <font-awesome-icon icon="undo-alt"></font-awesome-icon>
                </button>
            </div>
        </header>

        <Chart :key="chartRefreshKey"></Chart>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Chart from "./GameplaysDurationChart.vue";

export default defineComponent({
    components: { Chart },
    setup() {
        const chartRefreshKey = ref<number>(0);
        const refresh = () => {
            chartRefreshKey.value += 1;
        };
        onMounted(() => window.addEventListener("resize", refresh));

        return { chartRefreshKey, refresh };
    },
});
</script>
