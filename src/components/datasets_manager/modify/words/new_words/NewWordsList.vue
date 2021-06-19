<template>
    <div id="new-words-list" class="table-wrap">
        <table>
            <thead>
                <th>ID</th>
                <th>Expected</th>
                <th>Displayed</th>
                <th>Action</th>
            </thead>
            <tr v-for="(item, index) in newWords" :key="index">
                <td class="center">{{ index + 1 }}</td>
                <td @click="() => removeWord(index)">{{ item.expected }}</td>
                <td>{{ item.displayed }}</td>
                <td class="center">
                    <button @click="() => removeWord(index)">Delete</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifiersManager from "@/composable/datasets_manager/useModifier";
//
export default defineComponent({
    setup() {
        const { newWords } = useModifiersManager;
        const removeWord = (index: number) => {
            newWords.value.splice(index, 1);
        };
        return { newWords, removeWord };
    },
});
</script>
