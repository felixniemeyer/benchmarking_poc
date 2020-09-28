import Vue from 'vue' 
import Buefy from 'buefy'
import './style.scss'
Vue.use(Buefy)

import Client from './client.vue' 

let vm = new Vue({
	el: '#app',
	render: h => h(Client) 
})
