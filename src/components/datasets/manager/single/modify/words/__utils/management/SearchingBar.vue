<template>
    <input type="text" placeholder="Search..." v-model="searchingPhrase" v-bind="$attrs" :maxlength="maxlength" />
    <button class="clear" @click="searchingPhrase = ''" :disabled="searchingPhrase.length === 0" v-bind="$attrs">X</button>
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
    inheritAttrs: false,
    setup(props) {
        const { tableFilters } = useWordsManager;
        const { searchingPhrase } = tableFilters[props.target];
        const maxlength = process.env.VUE_APP_MAXIMUM_LENGTH_OF_WORD;

        return { searchingPhrase, maxlength };
    },
});
</script>
