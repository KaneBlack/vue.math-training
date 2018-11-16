<template>
	<div class="alert alert-secondary">
		<h3>Are you ready</h3>
		<hr>
		<button class="btn btn-success" @click="$emit('onStart')">Start</button>
	</div>
</template>

<script>
    export default {
        name: "StartScreen"
    }
</script>

<style scoped>

</style>
