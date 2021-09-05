<template>
    <div class="single-gameplay-representation">
        <Icon :dataset="dataset"></Icon>
        <!--  -->
        <div class="content">
            <!--  -->
            <Content :dataset="dataset" :index="index"></Content>
            <!--  -->
            <div class="buttons-wrap">
                <router-link :to="`/datasets-manager/${dataset.fileName}`">Modify</router-link>
                <!-- <button @click="selectDataset(dataset)" :tabindex="tabindex"></button> -->
                <button @click="inspectProgress" :tabindex="tabindex">Inspect progress</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { GameplayDataFileForPreview } from "@/types/Gameplay";

import router from "@/router/index";
import useLoader from "@/composable/datasets_loaders/useDatasetsLoader";
import useModifiersManager from "@/composable/datasets_manager/useModifier";
import useModifier from "@/composable/datasets_manager/useModifier";

import Icon from "./Icon.vue";
import Content from "./Content.vue";

export default defineComponent({
    props: {
        dataset: {
            type: Object as PropType<GameplayDataFileForPreview>,
            required: true,
        },
        index: {
            type: Number as PropType<number>,
            required: true,
        },
    },
    components: { Content, Icon },
    setup(props) {
        const { gameplaysIconPathResolver } = useLoader;
        const { datasetToModify } = useModifier;
        const { selectDataset } = useModifiersManager;
        const tabindex = computed<-1 | 1>(() => {
            return datasetToModify.value ? -1 : 1;
        });
        const inspectProgress = () => {
            router.push({ path: `/statistics/${props.dataset.fileName}` });
        };

        return { gameplaysIconPathResolver, selectDataset, tabindex, inspectProgress };
    },
});
</script>
