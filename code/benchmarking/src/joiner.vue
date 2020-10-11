<template>
	<section>
		<b-field grouped>
			<b-field label="Jiff server">
				<b-input v-model="jiffServer"></b-input>
			</b-field>
			<b-field label="Pary ID">
				<b-input v-model="computationId"></b-input>
			</b-field>
		</b-field>
		<b-field>
			<b-button type="is-primary" v-on:click="join">
				Join session
			</b-button>
		</b-field>
	</section>
</template>

<script>
export default {
	data: function() {
		return {
			jiffServer: '', 
			computationId: ''
		}
	}, 
	methods: {
		join: function() {
			this.$emit('join', {
				jiffServer: this.jiffServer, 
				computationId: this.computationId
			})
		}
	}
}
</script>

<style lang="scss">
</style>
