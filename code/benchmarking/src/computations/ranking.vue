<template>
	<section>
		<b-field label="Rank input">
			<InputSelector 
				v-bind:inputs="inputs"
				v-bind:inputsConfig="parameters.inputs"
				inputName="toBeRanked"
				/>
		</b-field>
		<b-field label="Maximally allowed value (Zp)">
			<b-input v-model="parameters.zp" ></b-input>
		</b-field>
	</section>
</template>

<script>
import InputSelector from './input-selector.vue'

export default {
	data: function() {
		return {}
	}, 
	props: {
		parameters: Object,
		inputs: Array
	}, 
	components: {
		InputSelector
	}
}
</script>

<style lang="scss">
</style>
