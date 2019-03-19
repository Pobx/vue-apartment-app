// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "core-js/es6/promise";
import "core-js/es6/string";
import "core-js/es7/array";
// import cssVars from 'css-vars-ponyfill'
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import MaskedInput from "vue-text-mask";
import VueNotifications from "vue-notifications";
import miniToastr from "mini-toastr";
import App from "./App";
import { router } from "./router";

// todo
// cssVars()
const toastTypes = {
  success: "success",
  error: "error",
  info: "info",
  warn: "warn"
};

// This step requires only for mini-toastr, just an initialization
miniToastr.init({ types: toastTypes });

function toast({ title, message, type, timeout, cb }) {
  return miniToastr[type](message, title, timeout, cb);
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
};

Vue.use(BootstrapVue);
Vue.use(VueNotifications, options);

Vue.component("masked-input", MaskedInput);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: {
    App
  }
});
