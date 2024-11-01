<template>
  <div class="container" style="min-height: 100%">
    <el-col div-lc-mark :span="24"></el-col> <el-text>Default</el-text>
    <span>Span Element</span>
  </div>
</template>

<script setup>
import { ref, computed, watch, filters } from 'vue'
const props = defineProps({})

const request = () => {}
onBeforeMount(() => {})
onMounted(() => {})
</script>

<style scoped>
h1 {
  color: #64b587;
}
</style>
