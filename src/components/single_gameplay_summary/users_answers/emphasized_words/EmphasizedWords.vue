<template>
    <section id="emphasized-words" :class="[emphasizedWordsCategory, scrollable]">
        <h2 class="label">
            <span>Selected words: </span>
            <span class="color">{{ emphasizedWordsCategory && emphasizedWordsCategory.replaceAll("_", " ") }}</span>
        </h2>
        <table>
            <thead>
                <th>ID</th>
                <th>Expectation</th>
                <th>Displayed</th>
            </thead>
            <tbody>
                <tr v-for="(word, index) in emphasizedWordsList" :key="word.expected">
                    <td>{{ index + 1 }}</td>
                    <td>{{ word.expected }}</td>
                    <td>{{ word.displayed }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useSummary from "@/composable/single_gameplay_summary/useSummary";
//
export default defineComponent({
    setup() {
        const { emphasizedWordsList, emphasizedWordsCategory } = useSummary;
        const scrollable = computed<string>(() => {
            return emphasizedWordsList.value && emphasizedWordsList.value.length > 10 ? "scrollable" : "";
        });
        //
        return { emphasizedWordsList, emphasizedWordsCategory, scrollable };
    },
});
</script>
