<template>
	<div class="box">
		<b-field grouped>
			<b-field label="Input Name">
				<b-input expanded v-model="inputConfig.name"></b-input>
			</b-field>
			<b-field label="Input Type">
				<b-select v-model="inputConfig.type" placeholder="Select a name">
					<option
						v-for="(inputType, key) in inputTypes"
						:value="inputType"
						:key="key">
						{{ inputType }}
					</option>
				</b-select>
			</b-field>
		</b-field>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			inputTypes: [
				"Number",
				"Decimal",
				"Enum"
			]
		}
	}, 
	props: {
		inputConfig: Object
	},
	created: function() {
	},
	methods: {
	}
}
</script>

<style lang="scss">
</style>
