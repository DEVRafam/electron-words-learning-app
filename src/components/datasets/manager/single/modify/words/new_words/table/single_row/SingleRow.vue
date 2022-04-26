<template>
    <tr :class="[word.condition, { deleted: hasBeenDeleted }]">
        <td class="center">{{ index + 1 }}</td>
        <!--  -->
        <Expected :word="word"></Expected>
        <Displayed :word="word"></Displayed>
        <!--  -->
        <td class="center origin" :class="{ inscribed: word.origin === 'Inscribed' }">{{ word.origin }}</td>
        <!--  -->
        <ActionButtons
            v-bind="{
                word: word,
                index: index,
            }"
            v-on="{
                'has-been-deleted': () => (hasBeenDeleted = true),
            }"
        ></ActionButtons>
    </tr>
</template>

<script lang="ts">
// Tools
import { defineComponent, PropType, ref } from "vue";
// Types
import type { NewWord } from "@/types/Word";
// Components
import ActionButtons from "./ActionButtons.vue";
import Displayed from "./Displayed.vue";
import Expected from "./Expected.vue";

export default defineComponent({
    components: { ActionButtons, Displayed, Expected },
    props: {
        word: {
            type: Object as PropType<NewWord>,
            required: true,
        },
        index: {
            type: Number as PropType<number>,
            required: true,
        },
    },
    setup() {
        const hasBeenDeleted = ref<boolean>(false);
        //
        return { hasBeenDeleted };
    },
});
</script>
