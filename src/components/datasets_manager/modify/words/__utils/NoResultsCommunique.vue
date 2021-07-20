<template>
    <section class="no-results-communique">
        <font-awesome-icon icon="exclamation-circle"></font-awesome-icon>
        <span class="explanation">
            <span>There are no </span>
            <strong v-if="progress !== 'all'" class="progress-status" :class="progress">{{ progress }}</strong>
            <span> words</span>
            <template v-if="searchingPhrase.length">
                <span> that would match the pharase </span>
                "<strong class="phrase">{{ searchingPhrase }}</strong
                >"
            </template>
        </span>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

export default defineComponent({
    props: {
        target: {
            type: String as PropType<"current" | "archived">,
            required: true,
        },
    },
    setup(props) {
        const { tableFilters } = useWordsManager;
        const { searchingPhrase, progress } = tableFilters[props.target];

        return { searchingPhrase, progress };
    },
});
</script>
