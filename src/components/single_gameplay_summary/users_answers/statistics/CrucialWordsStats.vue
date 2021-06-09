<template>
    <section class="statistic field">
        <h2 class="label">
            <span>Crucial </span>
            <span class="color">words</span>
        </h2>
        <table>
            <thead>
                <th>Words type</th>
                <th>Amount</th>
                <th>Show details</th>
            </thead>
            <tbody>
                <tr>
                    <td>Mastered words</td>
                    <td class="center bold">{{ crucial_words.words_made_mastered.length }}</td>
                    <td class="center">
                        <button :disabled="crucial_words.words_made_mastered.length == 0">Show</button>
                    </td>
                </tr>
                <tr>
                    <td>Strong words</td>
                    <td class="center bold">{{ crucial_words.words_made_strong.length }}</td>
                    <td class="center">
                        <button :disabled="crucial_words.words_made_strong.length == 0">Show</button>
                    </td>
                </tr>
                <tr>
                    <td>Weak words</td>
                    <td class="center bold">{{ crucial_words.words_made_weak.length }}</td>
                    <td class="center">
                        <button :disabled="crucial_words.words_made_weak.length == 0">Show</button>
                    </td>
                </tr>
                <tr>
                    <td>Deleted strong</td>
                    <td class="center bold">{{ crucial_words.words_removed_from_strong.length }}</td>
                    <td class="center">
                        <button :disabled="crucial_words.words_removed_from_strong.length == 0">Show</button>
                    </td>
                </tr>
                <tr>
                    <td>Deleted weak</td>
                    <td class="center bold">{{ crucial_words.words_removed_from_weak.length }}</td>
                    <td class="center">
                        <button :disabled="crucial_words.words_removed_from_weak.length == 0">Show</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { data } from "@/composable/single_gameplay_summary/loadData";

//
export default defineComponent({
    setup() {
        return {
            crucial_words: data.value.crucial_words,
        };
    },
});
</script>
