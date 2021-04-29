<template>
 <div class="wrapper w-full p-24 bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400 xl:px-5">
    <Loading :active.sync="isLoading" background-color='radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)' :opacity=0.9 >    
    <div id="lottie" ref='lottieBox'></div>
    </Loading>
   
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
         <InfoBox status='Confirmed' :newCases=NewConfirmed :total=TotalConfirmed
         />
         <InfoBox status='Deaths' :newCases=NewDeaths :total=TotalDeaths
         />
         <InfoBox status='Recovered' :newCases=NewRecovered :total=TotalRecovered
         />
    </div>
    <!--info box-->

     <div class="flex justify-end mt-5 sm:justify-center">
     <span class="text-2xl sm:text-base text-blue-800 font-semibold">Last Update: {{$moment(date).format('YYYY/MM/DD')}}</span>
    </div>
    </div> <!--container-->
   </section>
 </div>
</template>

<script>
import InfoBox from '@/components/InfoBox'
import lottie from 'lottie-web'
import loadingJson from '@/assets/loading.json'
export default {
  components: {
    InfoBox
  },
  data() {
    return {
      isLoading:false,
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
          this.isLoading = true

          this.NewConfirmed = this.global.NewConfirmed
          this.TotalConfirmed = this.global.TotalConfirmed
          this.NewDeaths = this.global.NewDeaths
          this.TotalDeaths = this.global.TotalDeaths
          this.NewRecovered = this.global.NewRecovered
          this.TotalRecovered = this.global.TotalRecovered

          this.isLoading = false
          return
   }else {
          this.isLoading = true

          const result = this.countries.filter(i=> i.Country.toLowerCase() === value.toLowerCase())
          
          console.log(result)
          const r = result[0]

          this.NewConfirmed = r.NewConfirmed
          this.TotalConfirmed = r.TotalConfirmed
          this.NewDeaths = r.NewDeaths
          this.TotalDeaths = r.TotalDeaths
          this.NewRecovered = r.NewRecovered
          this.TotalRecovered = r.TotalRecovered

          this.isLoading = false
       }
     },
   async getData() {
      try {
          this.isLoading = true

          const {data: { Date:date, Global, Countries } }  = await this.$axios.get('https://api.covid19api.com/summary')

          this.date = date
          this.global = Global
          this.countries = Countries

          this.isLoading = true
      }catch(err) {
        this.isLoading = false
        if(err.response) {
          alert('error!')
        }
      }
        
       
      }
   },
   async created() {
     this.isLoading = true
     await this.getData()
     this.fillData('Global')
     this.selectedCountry = 'Global'
     this.isLoading = false
   },
     mounted() { 
      const lottieSvg =lottie.loadAnimation({
      wrapper:this.$refs.lottieBox,
      animType: 'svg',
      loop: true,
      animationData: loadingJson,
      prerender: true,
      autoplay: true
    })
    lottieSvg.setSpeed(3) 
   }
}
</script>

<style lang="scss" scoped>
 .wrapper {
   min-height:100vh;

 }


</style>