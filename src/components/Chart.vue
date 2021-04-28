
<script>
import { Line , mixins } from 'vue-chartjs'
const { reactiveProp } = mixins;

export default {
  extends: Line,
  name:'Chart',
  mixins: [reactiveProp],
  props: {
    label: {
      type:String
    },
    chartData: {
      type: Array,
      default: null
    },
    // recoverData: {
    //   type:Array
    // },
    // confirmedData: {
    //   type:Array
    // },
    options: {
      type: Object,
      default: null
    },
    chartColor: {
      type:Object
    }
  },
  mounted () {
    const dates = this.chartData.map(i=> i.date)
    const deathsTotals = this.chartData.map(i=> i.totalCases) 
    const { borderColor,backgroundColor ,borderWidth } = this.chartColor

    this.renderChart({
        labels:dates,
        datasets: [
        {
            label:this.label,
            data:deathsTotals,
            backgroundColor,
            borderColor,
            borderWidth,          
            pointRadius: 0,     
        },
       
       ]
   },
    this.options)
  }
}
</script>

<style>

</style>