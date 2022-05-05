<template>
	<div class="detai">Details</div>
</template>

<script setup lang="ts">
	import { useRoute } from "vue-router";

	const route = useRoute();

	console.log(route.query);
</script>

<style lang="scss">
	.detai {
		background-color: aqua;
	}
</style>
