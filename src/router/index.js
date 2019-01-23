import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const ApartmentsTable = () => import('@/views/apartments/table')
const RoomCategoriesTable = () => import('@/views/room-categories/table')
const RoomsTable = () => import('@/views/rooms/table')
const UtilitiesCategoriesTable = () => import('@/views/utilities-categories/table');
const UtilitiesPackagesTable = () => import('@/views/utilities-packages/table');
const RentersTable = () => import('@/views/renters/table');
const RentersForm = () => import('@/views/renters/form');

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'setting',
          redirect: '/setting/apartments',
          name: 'Setting',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'apartments',
              name: 'Apartments',
              component: ApartmentsTable
            },
            {
              path: 'room-categories',
              name: 'RoomCategories',
              component: RoomCategoriesTable
            },
            {
              path: 'rooms',
              name: 'Rooms',
              component: RoomsTable
            },
            {
              path: 'utilities-categories',
              name: 'UtilitiesCategories',
              component: UtilitiesCategoriesTable
            },
            {
              path: 'utilities-packages',
              name: 'UtilitiesPackages',
              component: UtilitiesPackagesTable
            },
            {
              path: 'renters',
              name: 'Renters',
              component: RentersTable
            },
            {
              path: 'renters-form/:id?',
              name: 'Renter Profile',
              component: RentersForm
            }

          ]
        }
      ]
    }
  ]
})
