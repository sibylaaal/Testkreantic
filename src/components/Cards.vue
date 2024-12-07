<script setup>
import { useWatchListStore } from '@/stores/Watchlisttore';
import { defineProps } from 'vue';

defineProps({
  data: {
    type: Object,
  },
});

const watchListStore = useWatchListStore(); 

const isInWatchList = (imdbID) => {
  return watchListStore.watchList.some((item) => item.imdbID === imdbID);
};

const addToWatchList = (movie) => {
  if (!isInWatchList(movie.imdbID)) {
    watchListStore.addToWatchList(movie);
  }
};
</script>

<template>
  <div class="col-12 col-md-4 p-2">
    <div class="card h-100">
      <img
        class="card-img-top"
        :style="{
          height: '200px',
          objectFit: 'cover',
        }"
        :src="data.Poster && data.Poster !== 'N/A' && data.Poster !== '' ? data.Poster : 'https://drive-in-theatre.netlify.app/movieImages/default-movie.png'"
        alt="Card image cap"
      />
      
      <div class="card-body d-flex flex-column">
        <h5 style="height: 5vw;" class="card-title fw-bold">{{ data.Title }}</h5>
        <div class="d-flex align-items-center">
          <i class="pi pi-star-fill" style="color: #FFD700"></i>
          <span>4.5</span>
        </div>

        <!-- Add to Watchlist Button -->
        <button
          @click="addToWatchList(data)"
          :disabled="isInWatchList(data.imdbID)"
          :class="[
            'btn',
            isInWatchList(data.imdbID) ? 'btn-secondary' : 'btn-success',
          ]"
          class="m-2"
        >
          {{ isInWatchList(data.imdbID) ? 'Already in Watchlist' : 'Add to Watchlist' }}
        </button>

        <!-- Go Somewhere Button -->
        <RouterLink :to="`/${data.imdbID}`" class="btn" style="color: #1ac659;">
          Go somewhere
        </RouterLink>
      </div>
    </div>
  </div>
</template>


<style scoped>
.btn-success{
  border: none;
  background-color:#1ac659 ;
}
.card {
  display: flex;
  flex-direction: column;
}

.card-body {
  flex-grow: 1;
}
</style>
