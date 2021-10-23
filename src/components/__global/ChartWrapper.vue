<template v-if="phase != 'failed'">
    <!--  -->
    <slot name="default" :key="chartRefreshKey"></slot>
    <!--  -->
    <teleport :to="controlButtonSelector" v-if="phase === 'loaded'">
        <button @click="refresh" class="refresh-chart" tabindex="-1" :disabled="disableButton">
            <font-awesome-icon icon="undo-alt"></font-awesome-icon>
        </button>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from "vue";

export default defineComponent({
    props: {
        controlButtonSelector: {
            type: String as PropType<string>,
            required: true,
        },
        disableButton: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
    },
    setup(props) {
        const chartRefreshKey = ref<number>(0);
        const refresh = () => {
            chartRefreshKey.value += 1;
        };
        const phase = ref<"loading" | "failed" | "loaded" | "default">("loading");
        //
        onMounted(() => {
            setTimeout(async () => {
                const loadElement = (): HTMLElement | null => document.querySelector(props.controlButtonSelector);
                for (let i = 0; i < 5; i++) if (!loadElement()) await new Promise((resolve) => setTimeout(resolve, 100));

                phase.value = loadElement() ? "loaded" : "failed";
            });
        });

        return { chartRefreshKey, refresh, phase };
    },
});
</script>
