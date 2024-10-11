<template>
  <div>
    <template v-slot:header>
      <div>slot: header</div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, filters } from 'vue'
let visible = ref(false)
let height = ref('')
let menuList = ref([])
let selectIndex = ref('')
let selectIcon = ref({})
const props = defineProps({
  width: {
    type: Number,
    default: 446,
  },
  title: {
    type: String,
    default: '',
  },
})
const test = () => {}
const test1 = (v) => {
  console.log(v)
}
</script>

<style scoped>
h1 {
  color: #64b587;
}
</style>
