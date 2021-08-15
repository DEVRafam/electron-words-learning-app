<template>
    <td :class="target">
        <template v-if="editMode">
            <input type="text" v-model="word[target]" :maxlength="MAXLENGTH" />
        </template>
        <!--  -->
        <template v-else>
            <span>{{ word[target] }}</span>
        </template>
    </td>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { NewWord } from "@/types/Word";
// import useWordsManager from '@/composable/datasets_manager/submodules/useWordsManager'
export default defineComponent({
    props: {
        target: {
            type: String as PropType<"expected" | "displayed">,
            required: true,
        },
        word: {
            type: Object as PropType<NewWord>,
            required: true,
        },
        editMode: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
    },
    setup() {
        const MAXLENGTH = process.env.VUE_APP_MAXIMUM_LENGTH_OF_WORD;
        return { MAXLENGTH };
    },
});
</script>
