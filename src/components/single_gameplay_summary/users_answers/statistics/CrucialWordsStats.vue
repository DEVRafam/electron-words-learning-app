<template>
    <section class="statistic field">
        <header>
            <h2 class="label">
                <span>Crucial </span>
                <span class="color">words</span>
            </h2>
            <button v-if="!blockCrucialWordsChart" :disabled="buttonsDisables.areCrucialWords()" @click="setCrucials">Inspect on chart</button>
        </header>
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
                        <button :disabled="crucial_words.words_made_mastered.length == 0" class="mastered" @click="setEmphasize('words_made_mastered')" :class="emphasizeOnCSSClassButton('words_made_mastered')">Show</button>
                    </td>
                </tr>
                <tr>
                    <td>Strong words</td>
                    <td class="center bold">{{ crucial_words.words_made_strong.length }}</td>
                    <td class="center">
                        <button :disabled="crucial_words.words_made_strong.length == 0" class="strong" @click="setEmphasize('words_made_strong')" :class="emphasizeOnCSSClassButton('words_made_strong')">Show</button>
                    </td>
                </tr>
                <tr>
                    <td>Weak words</td>
                    <td class="center bold">{{ crucial_words.words_made_weak.length }}</td>
                    <td class="center">
                        <button :disabled="crucial_words.words_made_weak.length == 0" class="weak" @click="setEmphasize('words_made_weak')" :class="emphasizeOnCSSClassButton('words_made_weak')">Show</button>
                    </td>
                </tr>
                <tr>
                    <td>Deleted strong</td>
                    <td class="center bold">{{ crucial_words.words_removed_from_strong.length }}</td>
                    <td class="center">
                        <button :disabled="crucial_words.words_removed_from_strong.length == 0" class="removedFromStrong" @click="setEmphasize('words_removed_from_strong')" :class="emphasizeOnCSSClassButton('words_removed_from_strong')">Show</button>
                    </td>
                </tr>
                <tr>
                    <td>Deleted weak</td>
                    <td class="center bold">{{ crucial_words.words_removed_from_weak.length }}</td>
                    <td class="center">
                        <button :disabled="crucial_words.words_removed_from_weak.length == 0" class="removedFromWeak" @click="setEmphasize('words_removed_from_weak')" :class="emphasizeOnCSSClassButton('words_removed_from_weak')">Show</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useSummary from "@/composable/single_gameplay_summary/useSummary";
import { managerHelper, blockCrucialWordsChart } from "@/composable/single_gameplay_summary/useChart";

//
export default defineComponent({
    setup() {
        const helpers = managerHelper();
        const { data, setEmphasize, emphasizeOnCSSClassButton } = useSummary;
        return {
            setEmphasize,
            emphasizeOnCSSClassButton,
            blockCrucialWordsChart,
            crucial_words: data.value.crucial_words,
            buttonsDisables: helpers.buttonsDisables,
            setCrucials: helpers.setCrucials,
        };
    },
});
</script>
