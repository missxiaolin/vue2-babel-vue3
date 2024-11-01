<template>
  <div class="container" style="min-height: 100%">
    <el-text>Default</el-text>
    <div div-lc-mark>
      <el-col div-lc-mark :span="24">
        <el-text>Default</el-text>
        <el-input placeholder></el-input>
      </el-col>
    </div>
    <el-autocomplete
      :fetch-suggestions="querySearch"
      clearable
      placeholder
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    request() {},
    handleSelect(item) {
      console.log(item);
    },
    querySearch(queryString, cb) {
      const restaurants = [
        {
          value: "vue",
          link: "https://github.com/vuejs/vue",
        },
        {
          value: "element",
          link: "https://github.com/ElemeFE/element",
        },
        {
          value: "cooking",
          link: "https://github.com/ElemeFE/cooking",
        },
        {
          value: "mint-ui",
          link: "https://github.com/ElemeFE/mint-ui",
        },
        {
          value: "vuex",
          link: "https://github.com/vuejs/vuex",
        },
        {
          value: "vue-router",
          link: "https://github.com/vuejs/vue-router",
        },
        {
          value: "babel",
          link: "https://github.com/babel/babel",
        },
      ];
      const createFilter = (queryString) => {
        return (restaurant) => {
          return (
            restaurant.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          );
        };
      };
      const results = queryString
        ? restaurants.filter(createFilter(queryString))
        : restaurants;
      cb(results);
    },
  },
};
</script>

<style scoped>
.container {
}
</style>
