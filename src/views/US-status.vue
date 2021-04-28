<template>
  <div class="wrapper w-full px-10 pb-24 pt-24 bg-gradient-to-r from-green-400 to-blue-500 
  ">
    <h2 class="stateSelected  text-white font-bold absolute -top-24 left-24 z-0 text-opacity-10">{{state}}</h2>

    <div class="relative z-50 container rounded-xl p-10 w-120 mx-auto xl:w-full md:p-2"> 

     <!--select and back -->
     <div class="select-back flex flex-wrap justify-between items-center mb-12 px-9 sm:px-0">
      <!--select-->  
      <div class="selectCountry  block sm:w-full sm:mb-6">
      <select class="rounded-xl focus:outline-none p-3 border-2 border-solid border-green-300 bg-green-300 text-white font-bold tracking-wider block w-full" v-model="state" @change='setData(state);'>
        <option value=""  disabled >CHOOSE STATE</option>
         <option v-for='c in stateList' :key='c.abbreviation' :value="c.abbreviation">{{c.name}}</option>     
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
    <div class="info-box mb-36  flex flex-wrap justify-center items-center w-full h-96 xl:h-auto sm:mb-10">
    <ul class="info-box-ul  h-full shadow-xl mr-12 p-10 rounded-xl  text-white font-semibold tracking-wide hover:scale-105 transform transition duration-500  flex flex-col justify-center items-center xl:w-full xl:mr-0 xl:mb-10 xl:h-auto">
      <li><box-icon name='group' type='solid'  class="mr-2 align-text-bottom" color='#ffffff' ></box-icon>總受測人數:<span v-if="!totalTestResults">查無資料</span>  <span>{{ totalTestResults }}</span></li>

      <li><box-icon name='sad' type='solid'  class="mr-2 align-text-bottom" color='#DA4167' ></box-icon>陽性人數:<span v-if="!positive">查無資料</span>  <span>{{ positive }}</span></li>

      <li><box-icon name='wink-smile' type='solid' color='#fff19b' class="mr-2 align-text-bottom" ></box-icon>陰性人數:<span v-if="!negative">查無資料</span>  <span>{{ negative }}</span></li>
  

      <li><box-icon name='skull' type='solid' class="mr-2 align-text-bottom" color='#ffffff' ></box-icon>死亡人數: <span v-if="!deaths">查無資料</span>  <span>{{ deaths }}</span></li>

      <li><box-icon name='cool' color='#fff' class="mr-2 align-text-bottom" ></box-icon>康復人數: <span v-if="!recovered">查無資料</span>  <span>{{ recovered }}</span></li>

      <li><box-icon name='bed' color='#fff' type='solid' class="mr-2 align-text-bottom" ></box-icon>加護病房:  <span v-if="!inIcuCurrently">查無資料</span>  
      <span>{{ inIcuCurrently }}</span></li>

      <li><box-icon name='pulse' color='#ffffff' class="mr-2 align-text-bottom"></box-icon>使用呼吸器:<span v-if="!onVentilatorCurrently">查無資料</span>   <span>{{ onVentilatorCurrently }}</span></li>

      <li><i class="fas fa-hospital-alt mr-2"></i>留院觀察:<span v-if="!hospitalizedCurrently">查無資料</span>   <span>{{ hospitalizedCurrently }}</span></li>
      
      <li><box-icon name='time' class="mr-2 align-text-bottom" type='solid' color='#ffffff' ></box-icon>最後更新: <span>{{$moment(update).format('YYYY/MM/DD') }}</span></li>

    </ul>

    <div class="info-img w-2/3 xl:w-full xl:order-first xl:mb-10 h-full xl:h-auto">
      <img src="@/assets/info-bg.jpg" alt="info-bg" class="rounded-xl object-cover object-top  w-full h-full ">
    </div>
    </div>
    <!--info box-->

   <div class="notes mb-5  shadow-xl overflow-hidden rounded-xl ">

     <div class="w-full ">
      <h3 class="text-5xl tracking-wider px-12 pt-12 inline-block font-semibold xs:text-xl md:text-md md:mb-5 xl:tracking-tight"><box-icon name='pencil' type='solid' size='md' class="mr-5 sm:hidden"  ></box-icon>NOTES ABOUT {{selectState}}</h3>  

       <a :href="`https://twitter.com/${twitter}`" class="twitter-link text-white  text-sm inline-block tracking-wide rounded-lg p-2  xl:rounded-none xs:w-full" target=_blank >

       <box-icon name='twitter' type='logo' animation='tada' color='#fff'  size='sm' class="h-5 align-bottom"></box-icon>   
        Twitter
       </a>  

      </div>

      <p class="note-para px-12 pb-20 pt-10 leading-9 overflow-ellipsis overflow-hidden md:px-8"> {{notes}}</p>

   </div>
  </div>
 </div>
</template>

<script>
export default {
 computed: {
   selectState() {
      const result = this.stateList.filter(i=> i.abbreviation === this.state)?.map(s=> s.name)
      const r =result.join()
      return r
   }
},
 data() {
  return {
    state:'',
    stateList:[],
    twitter:'',
    notes:'',
    update:'',
    deaths:'',
    positive:'',
    negative:'',
    inIcuCurrently:'',
    recovered:'',
    hospitalizedCurrently:'',
    totalTestResults:'',
    onVentilatorCurrently:'',
  }
 },
 methods: {
    
     async setData(state) {
    
      const {data:stateInfo} = await this.$axios.get(`https://api.covidtracking.com/v1/states/${state}/info.json`)
      console.log(stateInfo)
      
      const {notes,twitter} = stateInfo
       this.notes = notes
       this.twitter = twitter

        const { data:daily } = await this.$axios.get(`https://api.covidtracking.com/v1/states/${state}/current.json`)
          console.log(daily)
            const { 
              positive,
              negative,
              totalTestResults,
              hospitalizedCurrently,
              inIcuCurrently,
              onVentilatorCurrently,
              recovered,
              death,  
              lastUpdateEt 
            } = daily

            this.positive = positive
            this.negative = negative
            this.totalTestResults = totalTestResults
            this.hospitalizedCurrently =hospitalizedCurrently
            this.inIcuCurrently =inIcuCurrently
            this.onVentilatorCurrently = onVentilatorCurrently
            this.recovered = recovered
            this.deaths = death 
            this.update = lastUpdateEt   
     },
   
     async getState() {
         const { data } = await this.$axios.get('https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json')
         
         this.stateList =data
     }
 },
   created() {
      this.getState()
      this.state ='AL'
      this.setData('AL')
    
 },
 
}
</script>

<style lang="scss" scoped>
$font-content: 'Itim', Microsoft JhengHei;
$font-title: 'The Girl Next Door', Microsoft JhengHei;
.wrapper {
  font-family: $font-content;
}

 .stateSelected {
  font-size: 24rem;
}
.twitter-link {
  background: #1c9cea;
}
.info-box-ul {
   li {
     width: 100%;
     margin-bottom: .5rem;
     font-size: 1.2rem;
     font-weight: 500;
   }
}
.notes {
   background:#fff ;
   background-image:radial-gradient(#bfc0c1 6.2%, transparent 0);
   background-size:25px 25px;

  h3 {
    font-family: $font-title;
  }
}
@media(max-width:415px) {
   .stateSelected {
    font-size: 15rem;
    top:-5rem;
    left:2rem
}
}
@media(max-width:321px) {
   .stateSelected {
    font-size: 10rem;
    top:-1rem;
    
 }
 .info-box-ul {
   li {
     font-size: .8rem;
   }
 }
}
</style>