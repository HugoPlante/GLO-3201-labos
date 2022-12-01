<template>
    <div>Lab 6 - Weather</div>
    <div>{{this.city}}</div>
</template>

<script>
export default {
  name: "Header",
  props: {
    city: String,
  },
};
</script>