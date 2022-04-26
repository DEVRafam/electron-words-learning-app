<template>
    <template v-if="word.type === 'pair' || word.type === 'image'">
        <ExpectedHelper :expected="word.expected" target="current">
            <div class="button-wrap">
                <Pronunciation :word="word"></Pronunciation>
                <button class="undo" :disabled="blockButton" @click="reset" tabindex="-1">
                    <font-awesome-icon icon="undo-alt"></font-awesome-icon>
                </button>
            </div>
        </ExpectedHelper>
    </template>
    <!--  -->
    <template v-else>
        <td class="expected irregular">
            <span v-for="(item, index) in JSON.parse(word.expected)" :key="index" class="irrgegular-form">
                <strong>Form {{ index + 1 }}-</strong> <span>{{ item }}</span>
            </span>
            <div class="button-wrap">
                <button class="undo" :disabled="blockButton" @click="reset" tabindex="-1">
                    <font-awesome-icon icon="undo-alt"></font-awesome-icon>
                </button>
            </div>
        </td>
    </template>
</template>

<script lang="ts">
// Tools
import CurrentWord from "@/classes/CurrentWord";
import { defineComponent, PropType, computed } from "vue";
// Components
import Pronunciation from "./Pronunciation.vue";
import ExpectedHelper from "@/components/datasets/manager/single/modify/words/__utils/table_cells/Expected.vue";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<CurrentWord>,
            required: true,
        },
    },
    emits: ["toggle-edit-mode"],
    components: { ExpectedHelper, Pronunciation },
    setup(props) {
        const blockButton = computed<boolean>(() => {
            return !props.word.hasBeenModified("expected");
        });
        const reset = () => props.word.resetProperty("expected");

        return { blockButton, reset };
    },
});
</script>
