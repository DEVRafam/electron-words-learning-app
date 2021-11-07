<template>
    <section id="pinned-buttons">
        <div class="part compare">
            <Swapper :currentIndex="swapperIndex" orientation="vertical">
                <button tabindex="-1" @click="toggleComparsionPanel">
                    <font-awesome-icon icon="columns"></font-awesome-icon>
                    <span>Compare</span></button
                ><button tabindex="-1" @click="toggleComparsionPanel">
                    <font-awesome-icon icon="chart-pie"></font-awesome-icon>
                    <span>Progress</span>
                </button>
                <button tabindex="-1" @click="() => (datasetToCompare = null)">
                    <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
                    <span>Exit</span>
                </button>
            </Swapper>
        </div>
        <div class="part">
            <button tabindex="-1" @click="modifyRoute"><font-awesome-icon icon="cog"></font-awesome-icon>Modify</button>
            <button tabindex="-1" @click="menuRoute"><font-awesome-icon icon="sign-out-alt"></font-awesome-icon>Menu</button>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import router from "@/router/index";
import useKeydown from "@/composable/useKeydown";
import { openComparsionPanel, datasetToCompare } from "@/composable/statistics/certain/submodules/useComparisons";

export default defineComponent({
    setup() {
        const menuRoute = () => router.push({ path: "/" });
        const modifyRoute = () =>
            router.push({
                name: "CertainDatasetManager",
                params: {
                    datasetsName: router.currentRoute.value.params.datasetsName,
                },
            });
        const toggleComparsionPanel = () => {
            openComparsionPanel.value = !openComparsionPanel.value;
        };
        const swapperIndex = computed<number>(() => {
            if (openComparsionPanel.value === false) return 0;
            else return datasetToCompare.value ? 2 : 1;
        });
        useKeydown([
            {
                key: "p",
                fn: modifyRoute,
                ctrl: true,
            },
            {
                key: "c",
                fn: () => {
                    if (datasetToCompare.value) datasetToCompare.value = null;
                    else toggleComparsionPanel();
                },
                ctrl: true,
            },
        ]);

        return { menuRoute, modifyRoute, toggleComparsionPanel, openComparsionPanel, datasetToCompare, swapperIndex };
    },
});
</script>
