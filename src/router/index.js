import Vue from "vue";
import Router from "vue-router";

// Containers
const DefaultContainer = () => import("@/containers/DefaultContainer");

// Views
const Dashboard = () => import("@/views/Dashboard");
const ApartmentsTable = () => import("@/views/apartments/table");
const RoomCategoriesTable = () => import("@/views/room-categories/table");
const RoomsTable = () => import("@/views/rooms/table");
const UtilitiesCategoriesTable = () =>
  import("@/views/utilities-categories/table");
const UtilitiesPackagesTable = () => import("@/views/utilities-packages/table");
const RentersTable = () => import("@/views/renters/table");
const RentersForm = () => import("@/views/renters/form");
const UtiliesMonthlyUsages = () =>
  import("@/views/utilities-monthly-usages/table");
const UtiliesMonthlyUsagesForm = () =>
  import("@/views/utilities-monthly-usages/form");
const UtiliesRoomsMonthlyUsages = () =>
  import("@/views/utilities-monthly-usages/table_monthly_usages");
const UtiliesRoomsMonthlyBills = () =>
  import("@/views/utilities-monthly-usages/table_monthly_bills");

const LoginPage = () => import("@/views/login/login");
Vue.use(Router);

export const router = new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      redirect: "/utilities-monthly-usages",
      name: "Home",
      component: DefaultContainer,
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Dashboard
        },
        {
          path: "utilities-monthly-usages",
          name: "UtiliesMonthlyUsages",
          component: UtiliesMonthlyUsages
        },
        {
          path:
            "utilities-monthly-usages-form/:rooms_id?/:utility_categories_id?",
          name: "UtiliesMonthlyUsagesForm",
          component: UtiliesMonthlyUsagesForm
        },
        {
          path: "utilities-rooms-monthly-usages/:rooms_id?",
          name: "UtiliesRoomsMonthlyUsages",
          component: UtiliesRoomsMonthlyUsages
        },
        {
          path: "utilities-rooms-monthly-bills/:rooms_id?",
          name: "UtiliesRoomsMonthlyBills",
          component: UtiliesRoomsMonthlyBills
        },

        {
          path: "setting",
          redirect: "/setting/apartments",
          name: "Setting",
          component: {
            render(c) {
              return c("router-view");
            }
          },
          children: [
            {
              path: "apartments",
              name: "Apartments",
              component: ApartmentsTable
            },
            {
              path: "room-categories",
              name: "RoomCategories",
              component: RoomCategoriesTable
            },
            {
              path: "rooms",
              name: "Rooms",
              component: RoomsTable
            },
            {
              path: "utilities-categories",
              name: "UtilitiesCategories",
              component: UtilitiesCategoriesTable
            },
            {
              path: "utilities-packages",
              name: "UtilitiesPackages",
              component: UtilitiesPackagesTable
            },
            {
              path: "renters",
              name: "Renters",
              component: RentersTable
            },
            {
              path: "renters-form/:id?",
              name: "Renter Profile",
              component: RentersForm
            }
          ]
        }
      ]
    },
    { path: "/login", component: LoginPage }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  // const publicPages = ["/login"];
  // const authRequired = !publicPages.includes(to.path);
  // const loggedIn = localStorage.getItem("user");

  // if (authRequired && !loggedIn) {
  //   return next({
  //     path: "/login",
  //     query: { returnUrl: to.path }
  //   });
  // }

  next();
});
