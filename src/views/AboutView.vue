
<script setup>
import Skeleton from '@/components/skeleton.vue';
import { useWatchListStore } from '@/stores/Watchlisttore';
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';


const router=useRoute();
const movie=ref({})
const loading=ref(false)
const {id}=router.params
onMounted(async()=>{
  try {
    loading.value=true
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&page=1&apikey=18029196`)
    const data = await response.json()
    movie.value=data
    loading.value=false
    console.log(movie.value)
  } catch (error) {
    
  }
})








const watchListStore = useWatchListStore(); // Pinia store for the watch list
const isInWatchList = (imdbID) => {
  return watchListStore.watchList.some((item) => item.imdbID === imdbID);
};


const addToWatchList = (movie) => {
  watchListStore.addToWatchList(movie);
};
</script>

<template>
  

  <div class="container align-items-center  mt-5">
    <RouterLink to="/">
      <i  style="background-color:#1ac659 ;"  class="pi pi-arrow-left text-light mb-2 mt-2 p-2 rounded"></i></RouterLink>
    <div v-if="loading" class="py-5">
            <Skeleton />
          </div> 
          <div v-if="!loading" class="row">
     
        <div class="col-md-6">
            <h2 class="mb-3">{{ movie.Title }}</h2>
            <div class="d-flex align-item-center justify-centent-center">
        <i class="pi pi-star-fill " style="color: #FFD700"></i>

       <span v-if="movie.imdbRating!='N/A'" class="ml-2" >{{ movie.imdbRating }}</span> 
       <div v-else class="text-secondary fw-bold ml-2">no rates</div>
    </div>
            <p class="text-muted mb-4">{{ movie.Plot }}</p>
            <div class="d-flex justify-center align-items-center">
                <span class="h6 me-2">Creators</span>
                <span class="text">{{ movie.Writer }}</span>
            </div>
            <div class="d-flex justify-center align-items-center">
                <span class="h6 me-2">Stars</span>
                <span class="text">{{ movie.Actors }}</span>
                
            </div>
            <button
          @click="addToWatchList(movie)"
          :disabled="isInWatchList(movie.imdbID)"
          :class="[
            'btn',
            isInWatchList(movie.imdbID) ? 'btn-secondary' : 'btn-success',
          ]"
          class="m-2"
        >
          {{ isInWatchList(movie.imdbID) ? 'Already in Watchlist' : 'Add to Watchlist' }}
        </button>

           <div class="h5 p-2">
             Top Casts
           </div>
            
        </div>
        <div class="col-md-6 align-center text-center mb-4">
            <img   :src="movie.Poster && movie.Poster !== 'N/A' && movie.Poster !== '' ? movie.Poster : 'https://drive-in-theatre.netlify.app/movieImages/default-movie.png'"

             alt="Product" class="img-fluid rounded mb-3 product-image " id="mainImage"/>
           
        </div>

    </div>
</div>


</template>


<style scoped>
.btn-success{
  border: none;
  background-color:#1ac659 ;
}</style>