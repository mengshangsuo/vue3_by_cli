<template>
	<!-- <nav>
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link>
		<button @click="toPage('/detail')">Detail</button>
	</nav> -->
	<router-view />
</template>

<script setup lang="ts">
	import { useRouter } from "vue-router";

	const router = useRouter();
	const toPage = (url: string) => {
		router.push({ path: url, query: { name: "name11", id: 2 } });
	};
</script>

<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	nav {
		padding: 30px;
		background-color: $bg;

		a {
			font-weight: bold;
			color: #2c3e50;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
</style>
