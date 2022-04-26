<template>
    <div class="expected group">
        <header>
            <label for="add-word-first-input" class="crucial">Expectation: </label>
        </header>
        <template v-if="type === 'irregular'">
            <label for="expected" class="irregular-form">First form: </label>
            <Input v-model.trim="irregulars[0].value" placeholder="First form" id="add-word-first-input"></Input>

            <label for="second" class="irregular-form">Second form: </label>
            <Input type="text" v-model.trim="irregulars[1].value" placeholder="Second form" :maxlength="MAX_LENGTH" id="second"></Input>

            <label for="third" class="irregular-form">Third form: </label>
            <Input type="text" v-model.trim="irregulars[2].value" placeholder="Third form" :maxlength="MAX_LENGTH" id="third"></Input>
        </template>
        <!--  -->
        <template v-else>
            <Input v-model.trim="expected" id="add-word-first-input"></Input>
        </template>
    </div>
</template>

<script lang="ts">
// Tools
import { defineComponent } from "vue";
// Composable
import useAddNewWordModal from "./useAddNewWordModal";
// Components
import Input from "./Input.vue";

export default defineComponent({
    components: { Input },
    setup() {
        const { expected, type, irregulars } = useAddNewWordModal;
        const MAX_LENGTH = process.env.VUE_APP_MAXIMUM_LENGTH_OF_WORD as unknown as number;

        return { expected, type, irregulars, MAX_LENGTH };
    },
});
</script>
