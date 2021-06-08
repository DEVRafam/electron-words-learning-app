<template>
    <section class="statistic field answers">
        <h2 class="label">
            <span>User's</span>
            <span class="color"> answers</span>
        </h2>
        <ul>
            <li class="valid">
                <span class="wrap">
                    <span>Valid: </span>
                    <strong>{{ answers.valid.length }}</strong>
                </span>
                <button>Show</button>
            </li>
            <li class="rescued">
                <span class="wrap">
                    <span>Rescued: </span>
                    <strong>{{ answers.rescued.length }}</strong>
                </span>
                <button>Show</button>
            </li>
            <li class="invalid">
                <span class="wrap">
                    <span>Invalid: </span>
                    <strong>{{ answers.invalid.length }}</strong>
                </span>
                <button>Show</button>
            </li>
        </ul>
    </section>
    <!--  -->
    <section class="statistic field">
        <h2 class="label">
            <span>Crucial </span>
            <span class="color">words</span>
        </h2>
        <ul>
            <li>
                <span>
                    <span>Mastered words: </span>
                    <strong>{{ crucial_words.words_made_mastered.length }}</strong>
                </span>
                <button>Show</button>
            </li>
            <li>
                <span>
                    <span>Strong words: </span>
                    <strong>{{ crucial_words.words_made_strong.length }}</strong>
                </span>
                <button>Show</button>
            </li>
            <li>
                <span>
                    <span>Weak words: </span>
                    <strong>{{ crucial_words.words_made_weak.length }}</strong>
                </span>
                <button>Show</button>
            </li>
            <li>
                <span>
                    <span>Deleted strong: </span>
                    <strong>{{ crucial_words.words_removed_from_strong.length }}</strong>
                </span>
                <button>Show</button>
            </li>
            <li>
                <span>
                    <span>Deleted weak: </span>
                    <strong>{{ crucial_words.words_removed_from_weak.length }}</strong>
                </span>
                <button>Show</button>
            </li>
        </ul>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { data } from "@/composable/single_gameplay_summary/loadData";

//
export default defineComponent({
    setup() {
        return {
            answers: data.value.answers,
            crucial_words: data.value.crucial_words,
        };
    },
});
</script>
