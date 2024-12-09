import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WatchlistView from '@/views/WatchlistView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/watchlist',
      name: 'watchlist',
 
      component: () => import('../views/WatchlistView.vue'),

    },
    
    
    {
      path: '/:id',
      name: 'movie',
  
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
