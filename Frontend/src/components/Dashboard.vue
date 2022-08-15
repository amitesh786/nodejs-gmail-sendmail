<template>
	<div class="headerContainer">
		<!-- Header Load -->
		<MainComponent />
	</div>
</template>

<script>
	import MainComponent from "./MainComponent";
	
	export default {
		name: "Dashboard",
		components: {
			MainComponent
		}
	};
</script>

<style scoped>
	.headerContainer {
		text-align: center;
	}
</style>
