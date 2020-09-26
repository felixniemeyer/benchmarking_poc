import Vue from 'vue' 
import Client from './client.vue' 

let vm = new Vue({
	el: '#app',
	render: h => h(Client) 
})
