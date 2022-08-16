<template>
	<div class="addContact">

		<!-- Email alert for use -->
		<b-alert v-model="showEmailAlert" variant="success" dismissible>
			<b-icon icon="emoji-smile" variant="success" scale="1.3">
			</b-icon>&nbsp;Email already in use...!
		</b-alert>

		<!-- Reset form -->
		<b-form @submit="onSubmit" @reset="onReset">
			
			<b-form-group
				id="input-group-1"
				label="Email address:"
				label-for="input-1"
				description="We'll never share your email with anyone else."
				invalid-feedback="Valid email is required"
			>
				<b-form-input
					:state="validateState('email')"
					id="input-1"
					v-model="$v.form.email.$model"
					type="email"
					required
					placeholder="Enter the email"
				></b-form-input>
			</b-form-group>

			<b-form-group id="input-group-2" label="Your User Name:" label-for="input-2">
				<b-form-input
					:state="validateState('name')"
					id="input-2"
					v-model="$v.form.name.$model"
					required
					placeholder="Enter name"
					invalid-feedback="Name is required, minimun 3 characters"
				></b-form-input>
			</b-form-group>
			
			<!-- Add button -->
			<b-button type="submit" variant="success">
				<b-icon icon="person-plus-fill" variant="" scale="1"></b-icon> Add
			</b-button>
		
		</b-form>
	</div>
</template>

<script>
	import { validationMixin } from "vuelidate";
	import { required, minLength, email } from "vuelidate/lib/validators";
	import { mapActions } from 'vuex';
	
	export default {
		mixins: [validationMixin],
		data: () => {
			return {
				form: {
					email: "",
					name: "",
					id_user: "",
				},
				show: true,
				showEmailAlert: false
			};
		},

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
			},
		},
		
		methods: {
			...mapActions({
				postAddcontact: 'backends/postAddcontact',
				getContactId: 'backends/getContactId'
			}),
			
			validateState(name) {
				const { $dirty, $error } = this.$v.form[name];
				return $dirty ? !$error : null;
			},

			async onSubmit(e) {
				e.preventDefault();
				this.form.id_user = this.$store.state.backends.id;

				// Verfiy email already in the list of contacts
				let contacts = this.$store.state.backends.contact;
				if(contacts.length > 0) {
					contacts.map(el => {
						if (el.email == this.form.email) {
							this.showEmailAlert = true;
						}
					})
				}

				if (!this.showEmailAlert) {
					// Headers of request with token
					let payload = {
						email: this.form.email,
						name: this.form.name,
						id_user: this.form.id_user
					};

					// Add new contact in DB
					this.postAddcontact(payload);

					// action to get all contacts
					if (this.$store.state.backends.id != '') {
						this.getContactId(this.$store.state.backends.id);
					}

					e.target.reset();
				}
			},

			onReset(e) {
				e.preventDefault();
				
				// Reset our form values
				this.form.email = "";
				this.form.name = "";
				
				// reset vuelidate error (red)
				this.$v.$reset();
			},
		},

		async mounted() {
			// action to get all contacts
			if (this.$store.state.backends.id != '') {
				this.getContactId(this.$store.state.backends.id);
			}
		},
	};
</script>

<style scoped>
	.addContact {
		margin-right: 1vw;
		margin-left: 1vw;
	}
</style>
