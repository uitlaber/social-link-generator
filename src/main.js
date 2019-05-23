import Vue from "vue";
import App from "./App.vue";
import VueUi from "@vue/ui";
import "@vue/ui/dist/vue-ui.css";
import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard);
Vue.use(VueUi);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
