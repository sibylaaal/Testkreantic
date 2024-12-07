<script setup>
import { ref, onMounted, watch } from 'vue';
import Cards from '@/components/Cards.vue';
import Empty from '@/components/empty.vue';
import Search from '@/components/Search.vue';
import Skeleton from '@/components/skeleton.vue';
import { useWatchListStore } from '@/stores/Watchlisttore';

const Movies = ref([]);
const page = ref(1);
const loading = ref(false);

const searchParams = ref({
  title: 'batman',
  year: 2022,
  genre: 'movie',
});

const watchListStore = useWatchListStore(); // Pinia store for the watch list

const PaginationAcc = () => {
  if (Movies.value.length === 0) return;
  page.value++;
};

const PaginationDec = () => {
  if (page.value > 1) page.value--;
};

const fetchMovies = async () => {
  try {
    loading.value = true;
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchParams.value.title}&y=${searchParams.value.year}&t=${searchParams.value.genre}&page=${page.value}&apikey=18029196`
    );
    const data = await response.json();
    Movies.value = data.Search || [];
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error('Error fetching movies:', error);
  }
};

const handleSearch = (searchData) => {
  searchParams.value.title = searchData.title; // Update title
  page.value = 1; // Reset to first page for a new search
};

const handleFilter = (filterData) => {
  searchParams.value = { ...searchParams.value, ...filterData }; // Merge year and genre
  page.value = 1; // Reset to first page for new filters
};

watch(page, fetchMovies);
watch(searchParams, fetchMovies, { deep: true });

onMounted(fetchMovies);

// Add to watch list



</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <Search @search="handleSearch" @filter="handleFilter" />
      </div>
      <div class="col-md-9">
        <div class="container">
          <h1 class="p-2 fw-bold">Search: {{ searchParams.title }}</h1>

          <div v-if="Movies.length > 0 && !loading" class="row p-2">
            <Cards
              v-for="movie in Movies"
              :key="movie.imdbID"
              :data="movie"
            />
       
          
          </div>

          <div v-if="loading" class="py-5">
            <Skeleton />
          </div>
        </div>
        <Empty v-if="Movies.length == 0 && loading==false" />

        <div class="d-flex justify-content-center">
          <nav>
            <ul class="pagination">
              <li class="page-item">
                <button
                  @click="PaginationDec"
                  :style="{ color: page === 1 ? 'gray' : '#1ac659' }"
                  :class="['page-link', page == 1 ? 'btn-secondary' : '']"
                >
                  Previous
                </button>
              </li>
              <li class="page-item">
                <button
                  @click="PaginationAcc"
                  :style="{ color: Movies.length == 0 ? 'gray' : '#1ac659' }"
                  :class="['page-link', Movies.length == 0 ? 'btn-secondary' : '']"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
