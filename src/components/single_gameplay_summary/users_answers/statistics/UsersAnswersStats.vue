<template>
    <section class="statistic field answers">
        <h2 class="label">
            <span>User's</span>
            <span class="color"> answers</span>
        </h2>
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
                        <button :disabled="answers.valid.length == 0" class="valid">Show</button>
                    </td>
                </tr>
                <tr>
                    <td>Rescued</td>
                    <td class="center bold">{{ answers.rescued.length }}</td>
                    <td class="center">
                        <button :disabled="answers.rescued.length == 0" class="rescued">Show</button>
                    </td>
                </tr>
                <tr>
                    <td>Invalid</td>
                    <td class="center bold">{{ answers.invalid.length }}</td>
                    <td class="center">
                        <button :disabled="answers.invalid.length == 0" class="invalid">Show</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
    <!--  -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { data } from "@/composable/single_gameplay_summary/loadData";

//
export default defineComponent({
    setup() {
        return {
            answers: data.value.answers,
        };
    },
});
</script>
