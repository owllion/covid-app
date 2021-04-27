<template>
  <div>     
    <h1>test</h1>
     <Chart />

  </div>
</template>

<script>
import Chart from '@/components/Chart'
export default {
 components: {
     Chart
 },
 data() {
  return {
    chartdata: []
  }
 },
}
</script>

<style lang="scss" scoped>

</style>