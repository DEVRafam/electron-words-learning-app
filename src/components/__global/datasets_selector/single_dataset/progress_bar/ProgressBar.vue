<template>
    <div class="progress-bar" :class="level">
        <template v-if="level !== 'NONE'">
            <span class="bar" :style="`width: ${percentages}%`"></span>
            <span class="note"
                >{{ level }} at <strong>{{ percentages }}%</strong></span
            >
        </template>
        <!--  -->
        <template v-else>
            <span class="note">Keep playing to make progress</span>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { DatasetFileForPreview } from "@/types/Dataset";
import useLoader from "@/composable/datasets_loaders/useDatasetsLoader";

export default defineComponent({
    props: {
        gameplay: {
            type: Object as PropType<DatasetFileForPreview>,
            required: true,
        },
        blocked: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
    },
    async setup(props) {
        const { determineSingularDatasetsProgress } = useLoader;
        if (props.blocked) {
            return { level: "blocked", percentages: 0 };
        } else {
            const { level, percentages } = await determineSingularDatasetsProgress(props.blocked ? ({} as DatasetFileForPreview) : props.gameplay);
            return { level, percentages };
        }
    },
});
</script>
