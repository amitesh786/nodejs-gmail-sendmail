<template>
	<div class="authForm">

		<!-- Alert message -->
		<b-alert show fade dismissible variant="danger">
			This website is a trial version, please do not provide personal information.
		</b-alert>

		<!-- SignIn/SignUp Tabs -->
        <div class="body">
			<img src="@/assets/login_banner1.png" class="banner"/>
				
			<b-card no-body class="shadow-lg">
				<b-tabs justified card class="tabs">
					<b-tab
						v-for="tab in tabs"
						v-bind:key="tab.title"
						v-bind:title="tab.title"
					>
						<component v-bind:is="tab.component"></component>
					</b-tab>
				</b-tabs>
			</b-card>
		</div>
    </div>
</template>

<script>
	import SignInForm from "./SignInForm";
	import SignUpForm from "./SignUpForm";

	export default {
		name: "InputHandler",
		data: () => {
			return {
				tabs: [
					{ component: SignUpForm, title: 'Sign-In' },
					{ component: SignInForm, title: 'Sign-Up' }
				]
			};
		}
	};
</script>

<style scoped>
	.authForm {
		/* margin-top: 20px; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		height: auto;
		padding: 20px;
		border-radius: 20px;
		background-color: white;
	}

	.body {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	.body .banner {
		width: auto;
		max-width: 40vw;
	}

	.body .tabs {
		width: 50vw;
	}
</style>
