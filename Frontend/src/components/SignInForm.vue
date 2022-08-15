<template>
	<div>
		<b-alert v-model="showPassAlert" variant="info" dismissible>
			Paswword incorrect...!
		</b-alert>

		<b-alert v-model="showEmailAlert" variant="warning" dismissible>
			Email incorrect...!
		</b-alert>

		<h4 class="myHelp">Please enter your email and password</h4>
		<br />

		<b-form @submit="onSubmit" v-if="show">
			
			<!-- email -->
			<b-form-group
				id="input-group-1"
				label="Email address:"
				label-for="input-1"
				invalid-feedback="Valid email is required"
			>
				<b-form-input
					:state="validateState('email')"
					id="input-1"
					v-model="$v.form.email.$model"
					type="email"
					placeholder="Enter the email"
				></b-form-input>
			</b-form-group>

			<!-- password -->
			<b-form-group
				id="input-group-2"
				label="Password:"
				label-for="input-2"
				invalid-feedback="Password is required, minimun 8 characters"
			>
				<b-form-input
					:state="validateState('password')"
					v-model="$v.form.password.$model"
					id="input-2"
					type="password"
					required
					placeholder="Enter the password"
				></b-form-input>
			</b-form-group>

			<!-- button -->
			<b-button type="submit" variant="success">
				Sign In <b-icon icon="key" variant="light" scale="1"></b-icon
			></b-button>

		</b-form>

	</div>
</template>

<script>	
	// Vuelidate
	import { validationMixin } from "vuelidate";
	import { required, minLength, email } from "vuelidate/lib/validators";
	import AuthService from '@/services/AuthService';

	// Always use vuex store with actions and getters
	import { mapActions } from "vuex";
	
	export default {
		mixins: [validationMixin],
		name: "SignInForm",
		data() {
			return {
				form: {
					email: "",
					password: "",
				},
				show: true,
				showPassAlert: false,
				showEmailAlert: false,
			};
		},

		// vuelidate
		validations: {
			form: {
				email: {
					required,
					email: email,
				},
				password: {
					required,
					minLength: minLength(8),
				},
			},
		},

		methods: {
			...mapActions({
				getContactById: 'getContactId',
				setAddName: 'setAddName',
				setAddId: 'setAddId',
				setAddToken: 'setAddToken'
			}),

			// Vuelidate
			validateState(name) {
				const { $dirty, $error } = this.$v.form[name];
				return $dirty ? !$error : null;
			},

			onSubmit(e) {
				let ctx = this;
				e.preventDefault();

				let payload = {
					email: this.form.email,
					password: this.form.password
				};

				// SignIn form
				// this.$store.dispatch("signIn", payload)
				AuthService.signIn(payload)
					.then(response => {

						if (response.data == "password error") {
							ctx.showPassAlert = true;
							ctx.$v.$reset();
						} else if (response.data == "Sorry, email incorrect") {
							ctx.showEmailAlert = true;
							ctx.$v.$reset();
						} else if (response.data.auth == true) {
							
							// Stock to store state the name, id and token
							ctx.setAddName(response.data.name);
							ctx.setAddId(response.data.id);
							ctx.setAddToken(response.data.token);

							// token store in local
							localStorage.setItem('token', response.data.token);
							
							// Change the path
							ctx.$router.push({ path: '/home' })

							// action to get all contacts
							if (ctx.$store.state.id != '') {
								ctx.getContactById(ctx.$store.state.id)
							}

						} else {
							alert("Error the password or email incorrect");
						}
						
						// Reset imput
						ctx.form.email = "";
						ctx.form.password = "";
						ctx.show = false;
						ctx.$nextTick(() => {
							ctx.show = true;
						});
					})
					.catch(error => {
						console.log(error);
					});
			},
		},
	};
</script>

<style scope>
	.myHelp{
		color: rgb(12, 144, 161);
	}
</style>
