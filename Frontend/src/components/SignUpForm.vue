<template>
	<div>
		<b-alert v-model="showSuccesLogin" variant="success" dismissible>
			<b-icon icon="emoji-smile" variant="success" scale="1.3">
			</b-icon> You have been register, go Sign-in now...!
		</b-alert>

		<b-alert v-model="showEmailAlert" variant="danger" dismissible>
			<b-icon icon="emoji-angry" variant="danger" scale="1.3">
				</b-icon>  this "email" already exist...!
		</b-alert>

		<h3 class="myHelp">Please fill this form to create an account</h3>
		<br>

		<b-form @submit="onSubmit" v-if="show">
			
			<!-- user name -->
			<b-form-group
				class="userNameLabel"
				id="input-group-1"
				label="Username:"
				label-for="input-1"
				invalid-feedback="Name is required, and minimun 3 characters"
			>
				<b-form-input
					:state="validateState('name')"
					id="input-1"
					v-model="$v.form.name.$model"
					placeholder="Enter the user name"
				></b-form-input>
			</b-form-group>

			<!-- email -->
			<b-form-group
				class="emailLabel"
				id="input-group-2"
				label="Email address:"
				label-for="input-2"
				invalid-feedback="Valid email is required"
			>
				<b-form-input
					:state="validateState('email')"
					id="input-2"
					v-model="$v.form.email.$model"
					type="email"
					placeholder="Enter the email"
				></b-form-input>
			</b-form-group>

			<!-- password -->
			<b-form-group
				class="passwordLabel"
				id="input-group-2"
				label="Password:"
				label-for="input-2"
				invalid-feedback="Password is required, minimun 8 characters"
			>
				<b-form-input
					:state="validateState('password')"
					id="input-2"
					type="password" 
					v-model="$v.form.password.$model"
					required
					placeholder="Enter the password"
				></b-form-input>
			</b-form-group>
			
			<!-- button to login-->
			<b-button type="submit" variant="success"> Sign Up
				<b-icon icon="plus-circle" variant="light" scale="1">
				</b-icon>
			</b-button>

		</b-form>
	</div>
</template>

<script>
	import { validationMixin } from "vuelidate";
	import { required, minLength, email } from "vuelidate/lib/validators";
	import AuthService from '@/services/AuthService';

	export default {
		mixins: [validationMixin],
		name: "SignUpForm",
		data() {
			return {
				form: {
					name: "",
					email: "",
					password: "",
				},
				show: true,

				// It wiill allow the ok sentence to be visible
				showNameAlert: false,
				showSuccesLogin: false,
				showEmailAlert: false
			};
		},

		// Vuelidate
		validations: {
			form: {
				email: {
					required,
					email: email,
				},
				name: {
					required,
					minLength: minLength(3),
				},
				password: {
					required,
					minLength: minLength(8),
				},
			},
		},

		methods: {
			validateState(name) {
				const { $dirty, $error } = this.$v.form[name];
				return $dirty ? !$error : null;
			},
			onSubmit(e) {
				e.preventDefault();
				let ctx = this;

				let payload = {
					name: this.form.name,
					email: this.form.email,
					password: this.form.password,
				};
				
				// SignUp form
				AuthService.signUp(payload)
					.then(response => {

						if (response.status == 201) {
							// will allow the succes alert to be visible
							ctx.showSuccesLogin = true;
						}
						if (response.status == 200) {
							ctx.showEmailAlert = true;
						}

						// reset the input
						ctx.form.name = "";
						ctx.form.email = "";
						ctx.form.password = "";
						
						// reset vuelidate error (red)
						ctx.$v.$reset();

						ctx.show = false;
						ctx.$nextTick(() => {
							ctx.show = true;
						});
					})
					.catch(error => {
						console.log(error);
					});
			},
		}
	};
</script>

<style scoped>
	.userNameLabel {
		text-align: left;
	}
	
	.emailLabel {
		text-align: left;
	}
	
	.passwordLabel {
		text-align: left;
	}
	.myHelp {
		color: rgb(12, 144, 161);
	}
</style>
