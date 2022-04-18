<template>
	<div class="about">
		<h1>This is an about page</h1>
		<el-button class="le-btn">Default</el-button>
		<div>Pinia :{{ testStore.current }}</div>
	</div>
</template>

<style scoped lang="scss">
	// 样式穿透
	::v-deep {
		// 	.le-btn {
		// 		background-color: red;
		// 	}
	}
</style>

<script setup lang="ts">
	import { useTestStore } from "@/store";

	const testStore = useTestStore();
</script>
