<template>
	<div class="mt-3">
		<!-- Email alert for use -->
		<b-alert v-model="showEmailAlert" variant="success" dismissible>
			<b-icon icon="emoji-smile" variant="success" scale="1.3">
			</b-icon>&nbsp;Email already in use...!
		</b-alert>

		<b-card-group columns>
			<b-card
				v-for="element in this.$store.state.contact"
					:key="element.id"
					border-variant="info"
					header=""
					align="center"
				>
				<b-card-header header-bg-variant="info" header-text-variant="white" class="spanName">
					<span >
						{{ element.name }}
					</span>
				</b-card-header>
				<br>
				
				<b-card-text> 
					<b-icon icon="envelope" variant="warning" scale="1.3"></b-icon> 
					<span class="spanEmail"> 
						{{ element.email }}
					</span>
				</b-card-text>
				
				<b-form-input 
					v-model="newEmail[element.email]" 
					placeholder="Enter new email"
					text="email">
				</b-form-input>
				<br />
				
				<b-button
					id="myBtn"
					pill
					variant="warning"
					size="sm"
					v-b-popover.hover.topright="'Are you sure you want to modify the email'"
					title="Modify Email"
					text="email"
					@click="setEmail(element.email)"
				>Modify Email</b-button>
				<hr />

				<b-button
					id="myBtn"
					pill
					variant="danger"
					size="sm"
					@click="deleteContact(element.email)"
					v-b-popover.hover.bottomleft="'Are you sure you want to delete the contact'"
					title="Carefully remove...!"
				>Delete
				<b-icon icon="trash" variant="light" scale="1"></b-icon>
				</b-button>

			</b-card>
		</b-card-group>

	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		name: "ContactList",
		data: () => {
			return {
				mailToDelete: "",
				newEmail: {},
				showEmailAlert: false
			};
		},

		methods: {
			...mapActions({
				putUserById: 'putUserId',
				getContactById: 'getContactId',
				deleteUserById: 'deleteUserId'
			}),

			setEmail(prevMail) {

				if(this.$store.state.contact.length > 0) {
					this.$store.state.contact.map(el => {
						if (el.email == this.newEmail[prevMail]) {
							this.showEmailAlert = true;
						}
					})
				}

				if(!this.showEmailAlert) {
					let specify = { specify: this.newEmail[prevMail] };

					// prepared payload to pass in action
					let payload = {
						prevMail : prevMail,
						specify : specify
					};
					// Modify user id in DB
					this.putUserById(payload);
					
					// get user id for all contact in DB
					if (this.$store.state.id != '') {
						this.getContactById(this.$store.state.id);
					}
				}
			},

			// delete email using user
			deleteContact(mailToDelete) {

				// delete user id for contact in DB
				this.deleteUserById(mailToDelete);
				
				// get user id for updatecontact in DB
				if (this.$store.state.id != '') {
					this.getContactById(this.$store.state.id);
				}
			},
		},

		mounted() {
			// get user id for update contact in DB
			if (this.$store.state.id != '') {
				this.getContactById(this.$store.state.id);
			}
		},
	};

</script>

<style scoped>
	.spanEmail {
		font-size: 1.3em;
	}
	.spanName {
		font-size: 1.3em;
		font-weight: 600;
	}
</style>
