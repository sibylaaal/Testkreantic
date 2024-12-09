<script setup>
import { ref } from 'vue';


const title = ref('');
const year = ref(2022);
const genre = ref('movie');

const titleError = ref('');
const yearError = ref('');
const emit = defineEmits(['search', 'filter']);


const ApplySearch = () => {
  titleError.value = ''; 
  if (!title.value.trim()) {
    titleError.value = 'Title is required.';
    return;
  }
  emit('search', { title: title.value });
};


const ApplyFilter = () => {
  yearError.value = ''; 

  if (year.value < 1900 || year.value > 2025) {
    yearError.value = 'Year must be between 1900 and 2025.';
    return;
  }

  emit('filter', {
    year: year.value,
    genre: genre.value,
  });
};
</script>

<template>
  <div>
    
    <form @submit.prevent="ApplySearch" class="mt-4">
      <div class="form-group border p-2">
        <label for="titleInput">Title</label>
        <input
          v-model="title"
          type="text"
          class="form-control p-2"
          id="titleInput"
          placeholder="Enter Movie title"
        />
        <div class="p-2">
        <span v-if="titleError" class="text-danger">{{ titleError }}</span>

        </div>
        <button
          type="submit"
          style="background-color: #1ac659; color: white;"
          class="btn my-2"
        >
          Search Title
        </button>
      </div>
    </form>

    <form @submit.prevent="ApplyFilter" class="mt-4">
      <div class="form-group border p-2">
        <label for="yearInput">Year</label>
        <input
          v-model="year"
          type="number"
          class="form-control"
          id="yearInput"
          min="1900"
          max="2025"
          step="1"
        />
        <div class="p-2">
                  <span v-if="yearError" class="text-danger">{{ yearError }}</span>

        </div>

        <label for="genreSelect">Genre</label>
        <select v-model="genre" class="form-control mt-2" id="genreSelect">
          <option value="movie">Movie</option>
          <option value="serie">Serie</option>
        </select>

        <button
          style="background-color: #1ac659; color: white;"
          class="btn w-full mt-2"
        >
          Apply Filters
        </button>
      </div>
    </form>
    
    <RouterLink to="/watchlist"
          style="background-color: #1ac659; color: white;width: 100%;"
          class="btn text-center w-full mt-2 mb-5"
        >
          My Watchlist
          
          <i class="pi pi-heart-fill" ></i>

        </RouterLink>
  </div>
</template>
