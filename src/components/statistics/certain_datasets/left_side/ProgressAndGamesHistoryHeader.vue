<template>
    <header class="progres-and-games-history">
        <Swapper :currentIndex="displayGamesHistory ? 0 : 1" orientation="vertical">
            <!--  -->
            <div>
                <h3 class="field-header">Games history</h3>
                <div class="buttons-wrap">
                    <button @click="toggleGamesHistory" :tabindex="displayGamesHistory ? 1 : -1">
                        <font-awesome-icon icon="chart-bar" class="with-margin"></font-awesome-icon>
                        <span>Progress</span>
                    </button>
                </div>
            </div>
            <!--  -->
            <div>
                <h3 class="field-header">
                    <span>Progress</span>
                </h3>
                <div class="buttons-wrap" id="accomplishment-and-games-history-buttons">
                    <button @click="toggleGamesHistory" :tabindex="displayGamesHistory ? -1 : 1">
                        <font-awesome-icon icon="clock" class="with-margin"></font-awesome-icon>
                        <span>Games history</span>
                    </button>
                </div>
            </div>
            <!--  -->
        </Swapper>
    </header>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
    props: {
        displayGamesHistory: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
    },
    emits: ["update:displayGamesHistory"],
    setup(props, { emit }) {
        const toggleGamesHistory = () => {
            emit("update:displayGamesHistory", !props.displayGamesHistory);
        };
        //
        return { toggleGamesHistory };
    },
});
</script>
