<template>
    <thead>
        <th>ID</th>
        <th>Expected</th>
        <th>Displayed</th>
        <th>Progress</th>
        <th class="actions">
            <div class="swap" :class="{ active: wordsToDelete.length >= 3 }">
                <span>Action</span>
                <div class="btn-wrap">
                    <button @click="wordsToDelete = []">Undo all</button>
                </div>
            </div>
        </th>
    </thead>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

export default defineComponent({
    setup() {
        const { wordsToDelete } = useWordsManager;
        return { wordsToDelete };
    },
});
</script>
