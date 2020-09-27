import Vue from 'vue' 
import Client from './client.vue' 

/*// use buefy for efficient ui dev
import Buefy from 'buefy'
import './style.scss'

Vue.use(Buefy)
*/

let vm = new Vue({
	el: '#app',
	render: h => h(Client) 
})
