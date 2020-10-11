<template>
	<b-field grouped>
		<b-field label="Jiff server">
			<b-input v-model="connectionConfig['jiffServer']"></b-input>
		</b-field>
		<b-field label="Session ID">
			<b-input v-model="connectionConfig.computationId"></b-input>
		</b-field>
	</b-field>
</template>

<script>

function getHostname() {
	let hostname = window.location.hostname.trim()
	let port = window.location.port
	if (port == null || port === "") {
		port = "80"
	}
	if (!(hostname.startsWith("http://") || hostname.startsWith("https://"))) {
		hostname = "http://" + hostname
	}
	if (hostname.endsWith("/")) {
		hostname = hostname.substring(0, hostname.length-1)
	}
	if (hostname.indexOf(":") > -1 && hostname.lastIndexOf(":") > hostname.indexOf(":")) {
		hostname = hostname.substring(0, hostname.lastIndexOf(":"))
	}
	return hostname + ":" + port
}

export default {
	data: function() {
		return {
		}
	}, 
	created: function() {
		console.log("HA!")
		this.connectionConfig.jiffServer = getHostname()
	},
	props: {
		connectionConfig: Object
	}
}
</script>

<style lang="scss">
</style>
