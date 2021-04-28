<template>
  <div class="wrapper w-full px-10 py-48 ">
      <div class="container rounded-xl p-10 w-120 mx-auto xl:w-full"> 
     <div class="selectCountry mb-10  flex justify-center w-full block">
      <select class="focus:outline-none p-3 border-2 border-solid border-green-300 bg-green-400 text-white font-bold tracking-wider" v-model="country" @change='setData(country);setConfirmed(country);setRecover(country)'>
        <option value=""  disabled >請選擇國家</option>
         <option v-for='c in countryList' :key='c' :value="c">{{c}}</option>
        
          </select>
    </div>     
     <div v-if='chartData'>
      <Chart :chartData=chartData :label=status :options=options v-if='loaded' :chartColor=chartColor   /> 
     </div>

  </div>
 </div>
</template>

<script>
import { getCountryStatus, getSummary } from '@/api/covid'
import Chart from '@/components/Chart'
export default {
 components: {
     Chart
 },
 computed: {
    chartColor() {
        let color = {}
        color.borderColor ='rgb(0,99,132)'
        color.borderWidth =2
        // color.backgroundColor = '#8F2D56'                    
         color.backgroundColor = 'rgb(0,99,132)'                    
        return color
    },
    recoverColor() {
        let color = {}
        color.borderColor ='pink'
        color.borderWidth =2
        color.backgroundColor = 'red'                    
        return color
    },
   confirmedColor() {
        let color = {}
        color.borderColor ='yellow'
        color.borderWidth =2
        color.backgroundColor = 'blue'                    
        return color
    }
},
    
 data() {
  return {
    loaded:false,
    chartData: [],
    recoverData:[],
    confirmedData:[],
    options:{
        responsive:true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            gridLines: {
                 drawOnChartArea: false
            }
        }],
         yAxes: [{
            gridLines: {
                 drawOnChartArea: false
            }   
        }]
    }
      
    },
    status:'deaths',
    country:'Taiwan',
    from:'2020-03-01',
    to:'2021-04-27',
    countryList:[]
  }
 },
 methods: {
     async setData(country) {
         this.chartData =[]    
         this.loaded = false
    
         const payload = {
             status: this.status,
             country,
             from: this.from,
             to: this.to
         }
         this.country = country

        const { data } = await getCountryStatus(payload)
        data.forEach(i=> {

            const date = this.$moment(i.Date).format('MM/DD')
            const { Cases } = i

            this.chartData.push({ date, totalCases : Cases })
           
        })
        
         
     },
     async setRecover(country) {
         this.recoverData =[]    
        
    
         const payload = {
             status: 'recovered',
             country,
             from: this.from,
             to: this.to
         }
        

        const { data } = await getCountryStatus(payload)
        data.forEach(i=> {
        
        console.log(data)
            const date = this.$moment(i.Date).format('MM/DD')
            const { Cases } = i

            this.recoverData.push({ date, totalCases : Cases })
           
        })
        this.loaded = true
         
     },
     async setConfirmed(country) {
         this.confirmedData =[]    
        
    
         const payload = {
             status: 'confirmed',
             country,
             from: this.from,
             to: this.to
         }
         

        const { data } = await getCountryStatus(payload)
        data.forEach(i=> {

            const date = this.$moment(i.Date).format('MM/DD')
            const { Cases } = i

            this.confirmedData.push({ date, totalCases : Cases })
           
        })
        
         
     },
     async getCountry() {
         const {data: {Countries} } = await getSummary()
         
         Countries.forEach(i=> {
             this.countryList.push(i.Country)
         })
     }
 },
   created() {
     this.setData('taiwan')
     this.getCountry()
    
 },
 
}
</script>

<style lang="scss" scoped>

</style>