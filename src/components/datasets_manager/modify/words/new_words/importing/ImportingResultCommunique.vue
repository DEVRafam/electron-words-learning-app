<template>
    <span id="importing-result-communique" :class="importingResult">
        <!--  -->
        <template v-if="importingResult == 'negative'">
            <font-awesome-icon icon="times-circle"></font-awesome-icon>
            <h1>An error has occured</h1>
        </template>
        <!--  -->
        <template v-else-if="importingResult == 'positive'">
            <font-awesome-icon icon="check-circle"></font-awesome-icon>
            <h1>
                <strong>{{ amountOfImportedWords }} </strong>
                <span> words {{ hasOrHave }} been imported successfully </span>
            </h1>
        </template>
    </span>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
//
export default defineComponent({
    setup() {
        const { importingResult, amountOfImportedWords } = useModifier;
        const hasOrHave = computed<"has" | "have">(() => {
            return amountOfImportedWords.value == 1 ? "has" : "have";
        });
        //
        return { importingResult, amountOfImportedWords, hasOrHave };
    },
});
</script>
