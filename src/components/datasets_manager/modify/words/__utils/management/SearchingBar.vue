<template>
    <input type="text" placeholder="Search..." v-model="searchingPhrase" />
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
        const { searchingPhrase } = tableFilters[props.target];

        return { searchingPhrase };
    },
});
</script>
