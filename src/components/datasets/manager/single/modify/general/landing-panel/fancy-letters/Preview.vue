<template>
    <section id="fancy-letters-preview">
        <!--  -->
        <template v-if="fancyLetters.length">
            <div class="single-letter" v-for="(letter, index) in fancyLetters" :key="index">
                <h4>{{ letter }}</h4>
                <button @click="() => removeLetter(index)" tabindex="-1">
                    <font-awesome-icon icon="times-circle"></font-awesome-icon>
                </button>
            </div>
        </template>
        <!--  -->
        <template v-else>
            <span class="empty-communique"> <font-awesome-icon icon="times-circle"></font-awesome-icon>Nothing to display</span>
        </template>
    </section>
</template>

<script lang="ts">
// Tools
import { defineComponent } from "vue";
// Composable
import useModifier from "@/composable/datasets_manager/useModifier";
//
export default defineComponent({
    setup() {
        const { fancyLetters } = useModifier.useGeneralInformations;

        const removeLetter = (index: number) => {
            fancyLetters.value.splice(index, 1);
        };

        return { fancyLetters, removeLetter };
    },
});
</script>
