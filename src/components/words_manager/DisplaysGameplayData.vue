<template>
    <section id="gameplays-data-preview">
        <!--  -->
        <div class="single-gameplay-representation" v-for="(gameplay, index) in dataToPreview" :key="index">
            <h3>{{ gameplay.title }}</h3>
            <p>{{ gameplay.description }}</p>
            <div class="icon" :style="gameplaysIconPathResolver(gameplay)"></div>
            <button>Inspect</button>
        </div>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useWordsManager from "@/composable/words_manager/useWordsManager";
//
export default defineComponent({
    async setup() {
        const { dataToPreview, gameplaysIconPathResolver } = useWordsManager;
        return { dataToPreview, gameplaysIconPathResolver };
    },
});
</script>
<style lang="sass" scoped="true">
div.icon
    width: 300px
    height: 200px
    background-size: contain
    background-repeat: no-repeat
    background-position: center
</style>
