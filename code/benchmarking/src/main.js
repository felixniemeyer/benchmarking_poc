import Vue from 'vue' 
import Client from './client.vue' 

import Buefy from 'buefy'
import './style.scss'

Vue.use(Buefy)

let vm = new Vue({
	el: '#app',
	render: h => h(Client) 
})
