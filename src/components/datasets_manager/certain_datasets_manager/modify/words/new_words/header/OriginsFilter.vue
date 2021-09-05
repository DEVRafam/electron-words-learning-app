<template>
    <select v-if="possibleOrigins.length > 1" v-model="origin">
        <option value="all">All origins</option>
        <option :value="option" v-for="(option, index) in possibleOrigins" :key="index">{{ option }}</option>
    </select>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

export default defineComponent({
    setup() {
        const { possibleOrigins, origin } = useWordsManager.tableFilters.news;
        return { possibleOrigins, origin };
    },
});
</script>
