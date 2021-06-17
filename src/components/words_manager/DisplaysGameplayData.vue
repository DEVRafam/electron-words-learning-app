<template>
    <section id="gameplays-datasets-preview" :class="scrollableClass">
        <!--  -->
        <div class="single-gameplay-representation" v-for="(gameplay, index) in dataToPreview" :key="index">
            <div class="icon" :style="gameplaysIconPathResolver(gameplay)"></div>
            <div class="content">
                <h3>
                    <strong>{{ index + 1 }}. </strong>
                    <span>{{ gameplay.title }}</span>
                </h3>
                <!--  -->
                <span class="li">
                    <span>Last modification: </span>
                    <strong>{{ gameplay.lastModified }}</strong>
                </span>
                <span class="li">
                    <span>Words amount: </span>
                    <strong>{{ gameplay.wordsAmount }}</strong>
                </span>
                <p>{{ gameplay.description }}</p>
                <!--  -->
                <div class="buttons-wrap">
                    <button>Modify</button>
                    <button>Inspect progress</button>
                </div>
            </div>
        </div>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useWordsManager from "@/composable/words_manager/useWordsManager";
//
export default defineComponent({
    setup() {
        const { dataToPreview, gameplaysIconPathResolver } = useWordsManager;
        const scrollableClass = computed<{ scrollable: boolean }>(() => {
            return { scrollable: dataToPreview.value.length > 4 };
        });
        return { dataToPreview, gameplaysIconPathResolver, scrollableClass };
    },
});
</script>
