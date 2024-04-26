import { createRouter, createWebHistory } from 'vue-router'
import ViewApplication from '@/views/ViewApplication.vue'
import AddApplication from '@/views/AddApplication.vue'
import HomeView from '@/views/HomeView.vue'
import ViewUser from '@/views/ViewUser'
import AddUser from '@/views/AddUser'
import UpdateApplication from '@/views/UpdateApplication'
import UpdateUser from '@/views/UpdateUser'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/view',
    name: 'view',
    component: ViewApplication
  },
  {
    path: '/addapp',
    name: 'add',
    component: AddApplication,

  },
  {
    path: '/update/:id',
    name: 'updateapp',
    component: UpdateApplication,

  },
  {
    path: '/viewuser',
    name: 'viewuser',
    component: ViewUser
  },
  {
    path: '/adduser',
    name: 'adduser',
    component: AddUser
  },
  {
    path: '/updateuser/:id',
    name: 'updateuser',
    component: UpdateUser,

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
