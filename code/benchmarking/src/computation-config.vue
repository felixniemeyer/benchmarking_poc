<template>
	<div class="tile">
		<b-field label="Computation Type">
			<b-select v-model="computationConfig.type" placeholder="Select a name">
				<option
					v-for="(computationType, key) in computationTypes"
					:value="computationType"
					:key="key">
					{{ computationType }}
				</option>
			</b-select>
		</b-field>
		<b-field label="Computation Title">
			<b-input expanded v-model="computationConfig.title"></b-input>
		</b-field>
		<b-field label="Computation Description">
			<b-input expanded type="textarea" v-model="computationConfig.description"></b-input>
		</b-field>

		<RankingConfig
			v-if="computationConfig.type == 'ranking'"
			v-bind:parameters="computationConfig.parameters"
			/>
		<AvgConfig
			v-if="computationConfig.type == 'avg'"
			v-bind:parameters="computationConfig.parameters"
			/>
		<MedianConfig
			v-if="computationConfig.type == 'median'"
			v-bind:parameters="computationConfig.parameters"
			/>
	</div>
</template>

<script>
import RankingConfig from './computations/ranking.vue'
import AvgConfig from './computations/ranking.vue'
import MedianConfig from './computations/ranking.vue'

export default {
	data: function() {
		return {
			computationTypes: [ //TODO: this may not be super nice, as this array is const
				'ranking', 
				'avg', 
				'median',
			],
		}
	}, 
	props: {
		computationConfig: Object
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
