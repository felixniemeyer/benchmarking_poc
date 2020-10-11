import Vue from "vue" 
import Buefy from "buefy"
import "./style.scss"
Vue.use(Buefy)

import App from "./app.vue" 

new Vue({
	el: "#app",
	render: h => h(App),
})
