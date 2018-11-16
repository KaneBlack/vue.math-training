<template>
	<div>
		<div class="alert" :class="'alert-' + type">
			<h2>{{ text }}</h2>
			<hr>
			<div class="buttons">
				<button class="btn btn-primary" @click="$emit('onNext')">
					Continue
				</button>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "Message",
		props: ['type', 'text']
    }
</script>

<style scoped>

</style>
