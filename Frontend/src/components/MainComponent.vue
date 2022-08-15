<template>
	<div>
		<!-- Navbar -->
		<div class="navBar">
			<div>
				<b-navbar toggleable="lg" type="dark" variant="info">
				<b-navbar-brand href="#">Dashboard</b-navbar-brand>
				
				<b-navbar-nav>
					<b-navbar-brand class="navNameUser" href="#" disabled>
					<b-avatar variant="light"></b-avatar>
					{{ userName }}
					</b-navbar-brand>
				</b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<b-button
					size="sm"
					class="my-2 my-sm-0"
					type="submit"
					variant="danger"
					@click="deleteToken"
					v-b-popover.hover.bottom="'Delete the token !'"
					title="Sign-Out"
					>Sign-Out <b-icon icon="x-circle" variant="light" scale="1"></b-icon></b-button
					>
				</b-navbar-nav>

				</b-navbar>
			</div>
		</div>

		<!-- Jumbotron -->
		<h3 class="userName">Welcome to {{ userName }} ...!!!</h3>
		
		<!-- Tabs -->
		<div class="card marginBox">
			<div class="row">

				<div class="col">
					<div class="body marginBox">
						<b-card no-body class="shadow-lg card">
							<div class="row">
								<div class="col-sm marginBox myTab">
									<b-tabs content-class="mt-3 mb-3 tabs">
										<b-tab
											v-for="tab in tabs"
											v-bind:key="tab.title"
											v-bind:title="tab.title"
										>
										<component v-bind:is="tab.component"></component>
										</b-tab>
									</b-tabs>
								</div>
							</div>
						</b-card>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import ContactList from "./ContactList";
	import AddContactForm from "./AddContactForm";
	import MessageContactForm from "./MessageContactForm";
	import { mapActions } from "vuex";
	
	export default {
		name: "Header",
		components: {
			ContactList,
			AddContactForm,
			MessageContactForm
		},
		data: function() {
			return {
				tabs: [
					{ component: AddContactForm, title: 'Add-Contact' },
					{ component: ContactList, title: 'List-Contact' },
					{ component: MessageContactForm, title: 'Message-Send' }
				],
			};
		},
		computed: {
			userName() {
				let local = this.$store.state.name;
				return local.charAt(0).toUpperCase() + local.slice(1);
			},
		},
		methods: {
			...mapActions({
				getDeleteToken: 'getDeleteToken',
				getDeleteContact: 'getDeleteContact'
			}),
			deleteToken() {
				this.getDeleteToken();
				this.getDeleteContact();
				localStorage.removeItem('token');
				this.$router.push({ path: '/login' });
			},
		},
	};
</script>

<style scoped>
	.liens {
		display: flex;
		align-items: center;
		background: darkgreen;
	}
	.myTab {
		margin-left: 15vw;
		margin-right: 15vw;
	}

	.marginBox {
		margin: 10px;
	}

	.nameUser {
		font-weight: bolder;
		font-size: 1.2em;
		font-style: italic;
	}
	.usName {
		color: rgb(12, 144, 161);
	}
	.userName{
		margin-top: 3px;
		margin-bottom: 3px;
	}

</style>