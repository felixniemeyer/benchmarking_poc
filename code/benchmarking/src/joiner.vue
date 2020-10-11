<template>
	<section>
		<Connector
			v-bind:connectionConfig="connectionConfig"
			/>
		<b-field>
			<b-button type="is-primary" v-on:click="join">
				Join session
			</b-button>
		</b-field>
	</section>
</template>

<script>
import Connector from "./connector.vue"

export default {
	data: function() {
		return {
			connectionConfig: {}
		}
	}, 
	methods: {
		join: function() {
			this.$emit("join", this.connectionConfig)
		}
	},
	components: {
		Connector
	}
}
</script>

<style lang="scss">
</style>
