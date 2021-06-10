<template>
    <div class="row">
        <section class="field" id="summary-header-row">
            <router-link to="/" class="go-back"><span>Return</span></router-link>
            <header>
                <h1>Summary</h1>
                <span class="date">
                    <span>From </span>
                    <strong>{{ date }}</strong>
                </span>
            </header>
            <!--  -->
            <!--  -->
            <ul>
                <li>
                    <span>
                        <span>Duraton: </span>
                        <strong>
                            <span>{{ duration }}</span>
                        </strong>
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
        const computeDuration = () => {
            if (data.value.session["duration[s]"] * 1 < 60) return data.value.session["duration[s]"].toFixed(2) + "s";
            const mins = Math.floor((data.value.session["duration[s]"] * 1) / 60);
            const secs = ((data.value.session["duration[s]"] * 1) % 60).toFixed(2);
            //
            return `${mins}min, ${secs}s`;
        };

        return {
            dataFileName,
            accuracy: data.value["accuracy[%]"],
            number_of_draws: data.value.number_of_draws,
            date: data.value.session.date,
            duration: computeDuration(),
        };
    },
});
</script>
