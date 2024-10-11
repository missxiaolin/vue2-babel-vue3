<template>
  <div>
    <div slot="header">slot: header</div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 446,
    },
    title: {
      type: String,
      default: "",
    },
  },
  methods: {
    test() {
      this.$emit('ceshi')
    },
    test1(v) {
      console.log(v)
    }
  }
};
</script>

<style scoped>
h1 {
  color: #64b587;
}
</style>
