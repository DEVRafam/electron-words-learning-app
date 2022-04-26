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

            <!-- LENGTH LIMIT -->
            <span class="length-limit-placeholder">
                <template v-if="searchingPhrase.length == maxlength">
                    <strong class="and">AND</strong>
                    <span class="length-limit">The maximum number of characters in the searching phrase equals </span>
                    <strong class="phrase">{{ maxlength }}</strong>
                </template>
            </span>
        </span>
    </section>
</template>

<script lang="ts">
// Tools
import { defineComponent, PropType } from "vue";
// Composable
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
        const maxlength = process.env.VUE_APP_MAXIMUM_LENGTH_OF_WORD;

        return { searchingPhrase, progress, maxlength };
    },
});
</script>
