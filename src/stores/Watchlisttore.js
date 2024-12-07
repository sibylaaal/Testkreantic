import { defineStore } from 'pinia';

export const useWatchListStore = defineStore('watchList', {
  state: () => ({
    watchList: [], 
  }),

  actions: {
    addToWatchList(movie) {
      if (!this.watchList.some((item) => item.imdbID === movie.imdbID)) {
        this.watchList.push(movie);
      } else {
        console.log('Movie already in watchlist:', movie.Title);
      }
    },
    removeFromWatchList(imdbID) {
      this.watchList = this.watchList.filter((movie) => movie.imdbID !== imdbID);
    },
    clearWatchList() {
      this.watchList = [];
    },
  },

  getters: {
    totalMoviesInWatchList: (state) => state.watchList.length,
  },
});
