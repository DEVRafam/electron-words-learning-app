<template>
    <section class="statistic field answers">
        <header>
            <h2 class="label">
                <span>User's</span>
                <span class="color"> answers</span>
            </h2>
            <button :disabled="buttonsDisables.areUserAnswers()" @click="setAnswers">Inspect on chart</button>
        </header>
        <table>
            <thead>
                <th>Words type</th>
                <th>Amount</th>
                <th>Show details</th>
            </thead>
            <tbody>
                <tr>
                    <td>Valid</td>
                    <td class="center bold">{{ answers.valid.length }}</td>
                    <td class="center">
                        <button :disabled="answers.valid.length == 0" class="valid" @click="setEmphasize('valid')" :class="emphasizeOnCSSClassButton('valid')">Show</button>
                    </td>
                </tr>
                <tr>
                    <td>Rescued</td>
                    <td class="center bold">{{ answers.rescued.length }}</td>
                    <td class="center">
                        <button :disabled="answers.rescued.length == 0" class="rescued" @click="setEmphasize('rescued')" :class="emphasizeOnCSSClassButton('rescued')">Show</button>
                    </td>
                </tr>
                <tr>
                    <td>Invalid</td>
                    <td class="center bold">{{ answers.invalid.length }}</td>
                    <td class="center">
                        <button :disabled="answers.invalid.length == 0" class="invalid" @click="setEmphasize('invalid')" :class="emphasizeOnCSSClassButton('invalid')">Show</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
    <!--  -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useSummary from "@/composable/single_gameplay_summary/useSummary";
import { managerHelper } from "@/composable/single_gameplay_summary/useChart";

//
export default defineComponent({
    setup() {
        const { data, setEmphasize, emphasizeOnCSSClassButton } = useSummary;
        const helpers = managerHelper();
        return {
            setEmphasize,
            emphasizeOnCSSClassButton,
            answers: data.value.answers,
            setAnswers: helpers.setAnswers,
            buttonsDisables: helpers.buttonsDisables, // for charts only
        };
    },
});
</script>
