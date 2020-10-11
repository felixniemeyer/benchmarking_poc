<template>
	<div class="box">
		<b-field grouped>
			<b-field label="Computation Title">
				<b-input expanded v-model="computationConfig.title"></b-input>
			</b-field>
			<b-field label="Computation Type">
				<b-select v-model="computationConfig.type" placeholder="Select a name">
					<option
						v-for="(computationType, key) in computationConfigTypes"
						:value="key"
						:key="key">
						{{ key }}
					</option>
				</b-select>
			</b-field>
		</b-field>

		<component 
			v-if="computationConfig.type !== undefined" 
			:is="computationConfigTypes[computationConfig.type]"
			v-bind:parameters="computationConfig.parameters"
			v-bind:inputs="inputs"
			/>
	</div>
</template>

<script>
import RankingConfig from "./computations/ranking.vue"
import AvgConfig from "./computations/ranking.vue"
import MedianConfig from "./computations/ranking.vue"

export default {
	data: function() {
		return {
			computationConfigTypes: { //TODO: this may not be super nice, as this array is const
				ranking: "RankingConfig", 
				avg: "AvgConfig", 
				median: "MedianConfig",
			},
		}
	}, 
	props: {
		computationConfig: Object,
		inputs: Array
	},
	created: function() {
	},
	methods: {
	},
	components: {
		RankingConfig, 
		AvgConfig, 
		MedianConfig
	}
}
</script>

<style lang="scss">
</style>
