<template>
    <div class="row">
        <section class="field" id="summary-header-row">
            <router-link to="/" class="go-back"><span>Return</span></router-link>
            <span class="date">
                <span>From </span>
                <strong>{{ date }}</strong>
            </span>
            <h1>Gameplay</h1>
            <!--  -->
            <!--  -->
            <ul>
                <li>
                    <span>
                        <span>Duraton: </span>
                        <strong>
                            <span>{{ duration }}</span>
                        </strong>
                        <span>s</span>
                    </span>
                </li>
                <li>
                    <span>
                        <span>Accuracy: </span>
                        <strong>
                            <span>{{ accuracy }}</span>
                        </strong>
                        <span>%</span>
                    </span>
                </li>
                <li>
                    <span>
                        <span>Number of draws: </span>
                        <strong>
                            <span>{{ number_of_draws }}</span>
                        </strong>
                    </span>
                </li>
            </ul>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useData from "@/composable/single_gameplay_summary/loadData";

//
export default defineComponent({
    setup() {
        const { data, dataFileName } = useData;
        return {
            dataFileName,
            accuracy: data.value["accuracy[%]"],
            number_of_draws: data.value.number_of_draws,
            date: data.value.session.date,
            duration: data.value.session["duration[s]"],
        };
    },
});
</script>
