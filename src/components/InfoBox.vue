<template>
   <!--box-->
       <div class="bg-transparent shadow-xl p-12 rounded-xl xs:p-7">
         <h3 class="text-blue-900 tracking-wider text-3xl font-bold mb-4 xl:text-center xs:text-xl">{{status}}</h3>
          <!--flex-->
        <div class="flex flex-wrap justify-between sm:justify-center"> 

        <!--info left-->
         <div class="info xl:mb-5 sm:w-full sm:text-center">
          <div>
           <span class="font-bold tracking-wide text-white">NEW :</span> {{ numWithComma(newCases) }}
         </div>
         <div>
           <span class="font-bold tracking-wide text-white">TOTAL :</span> {{ numWithComma(total) }}
         </div>
         </div>
         <!--info left-->

         <!--right-->
         <div class="img  pl-8 sm:pl-0">
           <img :src="require(`@/assets/${status}.png`)" alt="" class="">
         </div>
        <!--right-->

        </div>
        <!--flex-->
          
       </div>
       <!--box-->
</template>

<script>
export default {
   name:'IngoBox',
   props: ['status', 'newCases', 'total' ],
   methods: {
      numWithComma(val) {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
     },
   }
}
</script>

<style>

</style>