<template>
	<div class="center">
		<!-- SignIn/SignUp form load -->
		<InputHandler />
	</div>
</template>

<script>
	import InputHandler from "./InputHandler";

	export default {
		name: "Login",
		components: {
			InputHandler,
		},
	};
</script>

<style scoped>
	.center {
		height: 100vh;
	}
</style>
