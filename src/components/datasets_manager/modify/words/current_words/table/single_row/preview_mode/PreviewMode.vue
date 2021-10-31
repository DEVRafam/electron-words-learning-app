<template>
    <Expected :word="word"></Expected>
    <Displayed :word="word"></Displayed>
    <!--  -->
    <slot name="default"></slot>
    <!--  -->
    <template v-if="loadExtendedContent">
        <td class="center type" :class="word.type">{{ word.type }}</td>
        <td class="center points" :class="arrow">
            <span>{{ pointsRecord.points }}</span>
            <font-awesome-icon v-if="arrow" :icon="`arrow-${arrow}`"></font-awesome-icon>
        </td>
        <td class="actions center">
            <button class="edit" @click="$emit('toggle-edit-mode')" tabindex="-1" :disabled="blockEditButton">Edit</button>
            <DeleteButton :word="word"></DeleteButton>
        </td>
    </template>
    <!--  -->
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import CurrentWord from "@/classes/CurrentWord";
import useModifier from "@/composable/datasets_manager/useModifier";
import { datasetWordsLatestPoints } from "@/composable/datasets_manager/submodules/useWordsManager";

import DeleteButton from "./DeleteButton.vue";
import Expected from "@/components/datasets_manager/modify/words/current_words/table/single_row/preview_mode/ExpectedWordWrapper.vue";
import Displayed from "@/components/datasets_manager/modify/words/current_words/table/single_row/preview_mode/DisplayedWordWrapper.vue";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<CurrentWord>,
            required: true,
        },
    },
    emits: ["toggle-edit-mode"],
    components: { Expected, Displayed, DeleteButton },
    setup(props) {
        const { loadExtendedContent } = useModifier;
        const blockEditButton = computed<boolean>(() => {
            return props.word.isInDeletingList();
        });
        const pointsRecord = computed<{ points: number; shift: "increased" | "decreased" | "equal" | "no_data" }>(() => {
            const o = datasetWordsLatestPoints.value;
            const key = props.word.expected;
            if (Object.keys(o).includes(key)) return o[key];
            else
                return {
                    points: 0,
                    shift: "no_data",
                };
        });
        const arrow = computed<false | "up" | "down">(() => {
            return {
                no_data: false,
                equal: false,
                increased: "up",
                decreased: "down",
            }[pointsRecord.value.shift] as false | "up" | "down";
        });

        return { blockEditButton, loadExtendedContent, pointsRecord, arrow };
    },
});
</script>
