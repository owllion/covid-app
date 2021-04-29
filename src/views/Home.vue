<template>
  <div class="wrapper  pt-36 bg-gradient-to-r from-green-400 to-blue-500">
   <section class="container px-24  sm:px-10">

   <h1 class="text-7xl xl:text-3xl mb-10 font-semibold text-white text-center"><box-icon name='virus' type='solid' flip='vertical' color='#ffffff'  class="mr-2" size='md'></box-icon>COVID-19 TRACKER</h1>

   <div class="inner-container flex flex-wrap items-center justify-around">

    <div class="left-link  rounded-xl trakcing-wider h-96 bg-yellow-600 text-white flex items-center justify-center overflow-hidden hover:-translate-y-2 duration-500 transition transform hover:shadow-xl ">
    <router-link to='/us-status' class="text-center block w-full h-full p-16  relative "> 
     <span class="relative z-20 inline-block pt-28 text-6xl xl:text-3xl">US STATES</span> 
     <div class="backdrop w-full h-full absolute top-0 left-0 z-10 pointer-events-none"></div> 
     <img src="@/assets/people.jpg" alt="" class="absolute w-full object-cover object-top h-full z-0 top-0 left-0"> </router-link>
    </div>

   <div class="right-link  rounded-xl trakcing-wider h-96 bg-yellow-600 text-white flex items-center justify-center overflow-hidden hover:-translate-y-2 duration-500 transition transform hover:shadow-xl">
    <router-link to='/total' class="text-center block w-full h-full p-16  relative"> 
     <span class="relative z-20 inline-block pt-28 text-6xl xl:text-3xl">GLOBAL</span> 
     <div class="backdrop w-full h-full absolute top-0 left-0 z-10 pointer-events-none"></div> 
     <img src="@/assets/home-bg.jpg" alt="" class="absolute w-full object-cover object-center h-full z-0 top-0 left-0"> </router-link>
    </div>


    </div>
    </section>
  </div>
</template>

<script>


export default {
  name: 'Home',
  
}
</script>

<style lang="scss" scoped>

.wrapper {
  min-height:100vh;
 .backdrop {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.5),rgba(0,0,0,.6));   
 }
  .left-link,.right-link{
    flex-basis: 48%;  
   &:hover {
      .backdrop {
        background-image:linear-gradient(180deg, rgba(0, 0, 0, 0.2),rgba(0,0,0,.3));
      }
   }
  }
}
@media(max-width:1024px) {
  .wrapper {
    .left-link {
      flex-basis: 100%;
      margin-bottom: 3rem;
    }
    .right-link {
      flex-basis: 100%;
    }
  }
}
</style>
