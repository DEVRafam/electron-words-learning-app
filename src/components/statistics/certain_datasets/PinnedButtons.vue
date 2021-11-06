<template>
    <section id="pinned-buttons">
        <div class="part">
            <button tabindex="-1" @click="toggleComparsionPanel" class="compare">
                <font-awesome-icon icon="columns"></font-awesome-icon>
                <span>{{ openComparsionPanel ? "Return" : "Compare" }}</span>
            </button>
        </div>
        <div class="part">
            <button tabindex="-1" @click="modifyRoute"><font-awesome-icon icon="cog"></font-awesome-icon>Modify</button>
            <button tabindex="-1" @click="menuRoute"><font-awesome-icon icon="sign-out-alt"></font-awesome-icon>Menu</button>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router/index";
import useKeydown from "@/composable/useKeydown";
import { openComparsionPanel } from "@/composable/statistics/certain/submodules/useComparisons";

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
        useKeydown([
            {
                key: "p",
                fn: modifyRoute,
                ctrl: true,
            },
            {
                key: "c",
                fn: toggleComparsionPanel,
                ctrl: true,
            },
        ]);

        return { menuRoute, modifyRoute, toggleComparsionPanel, openComparsionPanel };
    },
});
</script>
