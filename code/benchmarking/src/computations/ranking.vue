<template>
	<section>
		<b-field label="Maximally allowed value (Zp)">
			<b-input v-model="parameters.zp" ></b-input>
		</b-field>
	</section>
</template>

<script>
export default {
	data: function() {
		return {}
	}, 
	props: {
		parameters: Object, 
	}
}
</script>

<style lang="scss">
</style>
