<script setup>
import Empty from '@/components/empty.vue';
import { useWatchListStore } from '@/stores/Watchlisttore';
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const Movies = ref([]);
const page = ref(1);
const loading = ref(false);

// Pinia store for watch list management
const watchListStore = useWatchListStore();

const fetchMovies = async () => {
  try {
    loading.value = true;
    const response = await fetch(
      `/api/?s=batman&y=2022&t=movie&page=${page.value}&apikey=18029196`
    );
    const data = await response.json();
    Movies.value = data.Search || [];
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error('Error fetching movies:', error);
  }
};

onMounted(fetchMovies);
</script>

<template>
  <div class="container">

    <RouterLink to="/">
<i  style="background-color:#1ac659 ;"  class="pi pi-arrow-left text-light  mt-5 p-2 rounded"></i></RouterLink>
    <!-- Watch List Section -->
    <h3 class="text-secondary pt-3 pb-5">Your Watch List ({{ watchListStore.totalMoviesInWatchList }})</h3>

    <div v-if="watchListStore.watchList.length === 0">
      <!-- If the watch list is empty, display the Empty component -->
      <Empty message="no movie founded" />
    </div>

    <div v-else class="row p-2">
      <!-- Display watch list as boxes -->
      <div
        v-for="movie in watchListStore.watchList"
        :key="movie.imdbID"
        class="col-md-3 mb-4"
        style="width: 18rem;"
      >
        <div class="card">
          <img :src="movie.Poster" class="card-img-top" alt="movie poster" />
          <div class="card-body">
            <h5 class="card-title">{{ movie.Title }}</h5>
            <RouterLink :to="`/${movie.imdbID}`" class="btn" style="color: #1ac659;">
          Go somewhere
        </RouterLink>
            <button
              @click="watchListStore.removeFromWatchList(movie.imdbID)"
              class="btn btn-danger"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
