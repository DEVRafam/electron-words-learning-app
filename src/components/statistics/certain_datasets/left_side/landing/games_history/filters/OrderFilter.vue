<template>
    <div class="group">
        <label for="order">Order </label>
        <select id="order" @change="handleChange" :tabindex="tabindex">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest_score">Highest score</option>
            <option value="lowest_score">Lowest score</option>
        </select>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { OrderFilter as T_OrderFilter } from "@/components/statistics/certain_datasets/left_side/landing/games_history/filters/types";

export default defineComponent({
    props: {
        orderFilter: {
            type: String as PropType<T_OrderFilter>,
            required: true,
        },
        tabindex: {
            type: Number as PropType<-1 | 1>,
            default: -1,
        },
    },
    emits: ["update:orderFilter"],
    setup(props, { emit }) {
        const handleChange = (e: InputEvent) => {
            emit("update:orderFilter", (e.target as HTMLSelectElement).value);
        };
        return { handleChange };
        //
    },
});
</script>
