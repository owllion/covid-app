<template>
 <div class="wrapper w-full px-10 pb-24 pt-24 bg-gradient-to-r from-green-400 to-blue-500">
   <section class="container px-24 xl:px-10 w-full">
       <h1 class="text-6xl font-semibold ">{{selectedCountry}}</h1>
        

      <div class="relative z-50 container rounded-xl p-10 w-120 mx-auto xl:w-full md:p-2"> 

     <!--select and back -->
     <div class="select-back flex flex-wrap justify-between items-center mb-12 px-9 sm:px-0">
      <!--select-->  
      <div class="selectCountry  block sm:w-full sm:mb-6">
      <select class="rounded-xl focus:outline-none p-3 border-2 border-solid border-green-300 bg-green-300 text-white font-bold tracking-wider block w-full" v-model="selectedCountry" @change="fillData(selectedCountry)">
        <option value=""  disabled >CHOOSE COUNTRY</option>
        <option value="global"  selected >Global</option>
         <option v-for='c in getCountry' :key='c' :value="c">{{c}}</option>     
      </select>
    </div> 
    <!--select-->

    <!--back--> 
      <div class="back-icon cursor-pointer sm:w-full">
        <a @click="$router.go(-1)" class="rounded-xl bg-gray-300 bg-opacity-40 p-4 hover:bg-opacity-80 transition duration-500 block w-full">
           <box-icon name='chevron-left' type='solid' flip='vertical' color='#000' size='sm' class="align-bottom"></box-icon><span>BACK</span>
        </a>
      </div>
    <!--back-->  
    </div>
    <!--info box-->
    <div class="grid grid-cols-3 md:grid-cols-1">
       <!--box1-->
       <div class="confirmed bg-red-700">
         <h3 class="text-blue-900 text-3xl font-bold mb-4">Confirmed</h3>
         <div>
           <span>NEW:{{NewConfirmed}}</span>
         </div>
         <div>
           <span>TOTAL:{{TotalConfirmed}}</span>
         </div>
          
       </div>
       <!--box1-->

       <!--box2-->
       <div class="confirmed bg-red-700">
         <h3 class="text-blue-900 text-3xl font-bold mb-4">Deaths</h3>
         <div>
           <span>NEW:{{NewDeaths}}</span>
         </div>
         <div>
           <span>TOTAL:{{TotalDeaths}}</span>
         </div>
          
       </div>
       <!--box2-->

       <!--box3-->
       <div class="confirmed bg-red-700">
         <h3 class="text-blue-900 text-3xl font-bold mb-4">RECOVERED</h3>
         <div>
           <span>NEW:{{NewRecovered}}</span>
         </div>
         <div>
           <span>TOTAL:{{TotalRecovered}}</span>
         </div>
          
       </div>
       <!--box3-->
       </div>
       <!--info box-->

    </div> <!--container-->
   </section>
 </div>
</template>

<script>
export default {
  
  data() {
    return {
      date:'',
      global:{},
      countries:[],
      selectedCountry:'',

      NewConfirmed:'',
      TotalConfirmed:'',
      NewDeaths:'',
      TotalDeaths:'',
      NewRecovered:'',
      TotalRecovered:''
    }
  },
  computed: {
    getCountry() {
       const list = this.countries.map(i=>i.Country)
       return list
    }
   
  },
   methods: {
     fillData(value) {
       if(value ==='global') {
          this.NewConfirmed = this.global.NewConfirmed
          this.TotalConfirmed = this.global.TotalConfirmed
          this.NewDeaths = this.global.NewDeaths
          this.TotalDeaths = this.global.TotalDeaths
          this.NewRecovered = this.global.NewRecovered
          this.TotalRecovered = this.global.TotalConfirmed
          return
       }else {
          const result = this.countries.filter(i=> i.Country.toLowerCase() === value.toLowerCase())
          
        console.log(result)
          const r = result[0]

          this.NewConfirmed = r.NewConfirmed
          this.TotalConfirmed = r.TotalConfirmed
          this.NewDeaths = r.NewDeaths
          this.TotalDeaths = r.TotalDeaths
          this.NewRecovered = r.NewRecovered
          this.TotalRecovered = r.TotalConfirmed
       }
     },
      async getData() {
         const {data: { Date:date, Global, Countries } }  = await this.$axios.get('https://api.covid19api.com/summary')

         this.date = date
         this.global = Global
         this.countries = Countries
         console.log(this.global)
         console.log(this.countries)
      }
   },
   created() {
     this.getData()
   }
}
</script>

<style lang="scss" scoped>



</style>