<template>
  <div>
    <Header :city="city"></Header>
    <div id="days">
      <Day v-for="day in this.forecast.data" :day="day"></Day>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Day from "./Day.vue";
import { getCoords } from "../../src/utils/utils";
import { getForecast } from "../api/api";

export default {
  name: "Weather",
  components: {
    Header,
    Day,
  },
  methods: {
    position: Object,
    forecast: Object,
  },
  computed: {
    city() {
      return this.forecast.city_name;
    },
  },

  async beforeMount() {
    this.position = await getCoords();

    this.forecast = await getForecast(
      this.position.coords.latitude,
      this.position.coords.longitude
    );
    console.log("forecast : ", this.forecast);
  },
};
</script>

<style scoped>
#days {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
