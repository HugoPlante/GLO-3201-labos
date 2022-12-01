<template>
  <div class="container">
    <!-- <div>{{ dayjs(this.day.datetime).locale("fr").format("ddd") }}</div> -->
    <div>
      {{
        Math.ceil(this.day.app_min_temp) +
        "/" +
        Math.ceil(this.day.app_max_temp)
      }}
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import "dayjs/locale/fr";

export default {
  name: "Day",
  props: {
    day: Object,
  },
  beforeMount() {
    console.log(this.day);
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
