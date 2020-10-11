<template>
	<b-select v-model="inputsConfig[inputName]" placeholder="choose input">
		<option
			v-for="(input, key) in inputs"
			:value="input"
			:key="key">
			{{ input }}
		</option>
	</b-select>
</template>

<script>

export default {
	data: function() {
		return {}
	}, 
	props: {
		inputs: Array,
		inputsConfig: Object, 
		inputName: String
	}
}
</script>

<style lang="scss">
</style>
