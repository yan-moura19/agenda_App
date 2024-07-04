/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import mainLayout from '@/layouts/mainLayout.vue'
import defaultRoutes from './default';

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: mainLayout,
     //redirect: { name: 'Login' },
    children: defaultRoutes,
    },
  ]
})

export default router
