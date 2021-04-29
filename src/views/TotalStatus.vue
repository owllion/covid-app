<template>
 <div class="wrapper w-full p-24 bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400 xl:px-5">
   <section class="container px-24 xl:px-10 w-full xs:px-5">
       <h1 class="text-6xl font-semibold text-white md:text-2xl tracking-wide md:mb-6 md:pl-3">{{selectedCountry}}</h1>
        

      <div class="relative z-50 container rounded-xl p-10 w-120 mx-auto xl:w-full md:p-2"> 

     <!--select and back -->
     <div class="select-back flex flex-wrap justify-between items-center mb-12 ">
      <!--select-->  
      <div class="selectCountry  block sm:w-full sm:mb-6">
      <select class="rounded-xl focus:outline-none p-3 border-2 border-solid border-blue-300 bg-blue-500 text-white font-bold tracking-wider block w-full" v-model="selectedCountry" @change="fillData(selectedCountry)">
        <option value=""  disabled >CHOOSE COUNTRY</option>
        <option value="Global"  selected >Global</option>
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
    <div class="grid grid-cols-3 gap-x-5 gap-y-8 md:grid-cols-1">
       <!--box1-->
       <div class="confirmed  bg-transparent shadow-xl p-12 rounded-xl xs:p-7">
         <h3 class="text-blue-900 tracking-wider text-3xl font-bold mb-4 xl:text-center xs:text-xl">Confirmed</h3>
          <!--flex-->
        <div class="flex flex-wrap justify-between sm:justify-center"> 

        <!--info left-->
         <div class="info xl:mb-5 sm:w-full sm:text-center">
          <div>
           <span class="font-bold tracking-wide text-white">NEW :</span> {{ numWithComma(NewConfirmed) }}
         </div>
         <div>
           <span class="font-bold tracking-wide text-white">TOTAL :</span> {{ numWithComma(TotalConfirmed) }}
         </div>
         </div>
         <!--info left-->

         <!--right-->
         <div class="img  pl-8 sm:pl-0">
           <img src="@/assets/confirm.png" alt="" class="">
         </div>
        <!--right-->

        </div>
        <!--flex-->
          
       </div>
       <!--box1-->

       <!--box2-->
       <div class="death bg-transparent shadow-xl p-12 rounded-xl xs:p-7">
         <h3 class="text-blue-900 tracking-wider text-3xl font-bold mb-4 xl:text-center xs:text-xl">Deaths</h3>
          <!--flex-->
        <div class="flex flex-wrap justify-between sm:justify-center"> 

        <!--info left-->
         <div class="info xl:mb-5 sm:w-full sm:text-center">
          <div>
           <span class="font-bold tracking-wide text-white">NEW :</span> {{ numWithComma(NewDeaths) }}
         </div>
         <div>
           <span class="font-bold tracking-wide text-white">TOTAL :</span> {{ numWithComma(TotalDeaths) }}
         </div>
         </div>
         <!--info left-->

         <!--right-->
         <div class="img  pl-8 sm:pl-0">
           <img src="@/assets/deaths.png" alt="" class="">
         </div>
        <!--right-->

        </div>
        <!--flex-->
          
       </div>
       <!--box2-->

       <!--box3-->
       <div class="recover bg-transparent shadow-xl p-12 rounded-xl xs:p-7">
         <h3 class="text-blue-900 tracking-wider text-3xl font-bold mb-4 xl:text-center xs:text-xl">Recovered</h3>
         <!--flex-->
        <div class="flex flex-wrap justify-between sm:justify-center"> 

        <!--info left-->
         <div class="info xl:mb-5 sm:w-full sm:text-center">
          <div>
           <span class="font-bold tracking-wide text-white">NEW :</span> {{ numWithComma(NewRecovered) }}
         </div>
         <div>
           <span class="font-bold tracking-wide text-white">TOTAL :</span> {{ numWithComma(TotalRecovered) }}
         </div>
         </div>
         <!--info left-->

         <!--right-->
         <div class="img  pl-8 sm:pl-0">
           <img src="@/assets/recover.png" alt="" class="">
         </div>
        <!--right-->

        </div>
        <!--flex-->

       </div>
       <!--box3-->
       </div>
       <!--info box-->
       <div class="flex justify-end mt-5 sm:justify-center">
         <span class="text-2xl sm:text-base">Last Update: {{$moment(date).format('YYYY/MM/DD')}}</span>
       </div>
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
     numWithComma(val) {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
     },
     fillData(value) {
      
       if(value ==='Global') {
                
          this.NewConfirmed = this.global.NewConfirmed
          this.TotalConfirmed = this.global.TotalConfirmed
          this.NewDeaths = this.global.NewDeaths
          this.TotalDeaths = this.global.TotalDeaths
          this.NewRecovered = this.global.NewRecovered
          this.TotalRecovered = this.global.TotalRecovered
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
          this.TotalRecovered = r.TotalRecovered
       }
     },
      async getData() {
         const {data: { Date:date, Global, Countries } }  = await this.$axios.get('https://api.covid19api.com/summary')

         this.date = date
         this.global = Global
         this.countries = Countries
       
      }
   },
   async created() {
     await this.getData()
     this.fillData('Global')
     this.selectedCountry = 'Global'
     
   }
}
</script>

<style lang="scss" scoped>
 .wrapper {
   min-height:100vh;

 }


</style>