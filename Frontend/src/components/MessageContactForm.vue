<template>
	<div class="card">
		<div class="row">
			<div class="col-sm mt-2 mb-2">
				
				<b-alert v-model="enableSuccess" variant="success" dismissible>
					<b-icon icon="emoji-smile" variant="success" scale="1.3">
					</b-icon>&nbsp;Message sent successfully...!!!
					<a @click="newMessage"> New message</a>
				</b-alert>

				<form @submit="onSubmit" v-if="show" >
					<h4>Send e-mail</h4>

					<div class="input-wrapper">
						<!-- <i class="fa fa-user icon"></i> -->

							<input
								class="input-field"
								type="text"
								placeholder="To: i.e amiteshsingh@gmail.com"
								name="email"
								autocomplete="off"
								required
								v-model="email"
							/>
					</div>

					<div class="input-wrapper">
						<!-- <i class="fa fa-envelope icon"></i> -->

						<input
							class="input-field"
							type="text"
							placeholder="Subject to be..."
							name="subject"
							required
							v-model="subject"
						/>
					</div>

					<div class="input-wrapper">
						<textarea
							id="message"
							name="message"
							placeholder="Message body.."
							style="height: 200px; width: 100%"
							required
							v-model="message"
							cols="30" rows="5"
						></textarea>
					</div>
					
					<!-- File upload -->
					<!-- <div class="attachment-wrapper">
						<label for="attachment">Attachment</label>&nbsp;&nbsp;
						<input id="attachment" ref="file" name="attachmentFile" type="file" required/>
					</div> -->
					
					<input type="submit" class="send-btn" value="Send Mail">
				</form>
			</div>
		</div>
		
    </div>
</template>


<script>
import { mapActions } from 'vuex';

	export default {
		name: "MessageContactForm",
		data() {
			return {
				email: '',
				subject: '',
				message: '',
				// attachmentFile: '',
				show: true,
				enableSuccess: false,
			};
		},

		methods: {
			...mapActions({
				sendMail : 'backends/sendMail'
			}),

			onSubmit(e) {
				this.show = false;
				this.enableSuccess = true;
				e.preventDefault();

				// store email to all conatct connected with this Id
				let storeEmails = [];
				let arrayToString = "";

				// email push all the list of contacts present for this user
				let contacts = this.$store.state.backends.contact;
				if (contacts.length > 0) {
					contacts.map( el => {
						storeEmails.push(el.email);
					})
					arrayToString = storeEmails.toString();
					this.email = this.email + ',' + arrayToString;
				}

				let payload = {
					email: this.email,
					subject: this.subject,
					message: this.message
					// attachment: this.attachmentFile
				}

				// send mail data to endpoint
				this.sendMail(payload);
				
				// Reset form field
				this.email = '';
				this.subject = '',
				this.message = '',
				this.attachmentFile = '';
			},

			newMessage() {
				this.show = true;
				this.enableSuccess = false;
			}
		},
	};
</script>

<style scoped>
	* {box-sizing: border-box;}

	.card {
		display: block;
		margin:auto;
		text-align: center;
		border-radius: 5px;
		background-color: #f2f2f2;
		padding: 20px;
		width: 50%;
	}

	input[type=text], [type=email], textarea {
		width: 100%;
		padding: 12px;
		/* border: 1px solid #ccc; */
		border-radius: 4px;
		box-sizing: border-box;
		margin-top: 6px;
		margin-bottom: 16px;
		resize: vertical;
		border: 1px solid #333333;
	}

	input[type=submit] {
		background-color: #4CAF50;
		color: white;
		padding: 12px 20px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	input[type=submit]:hover {
		background-color: #45a049;
	}

	.icon {
		padding: 10px;
		background: #634eeb;
		color: white;
		min-width: 50px;
		text-align: center;
		font-family: "Poppins";
	}

	.input-field {
		width: 100%;
		padding: 10px;
		outline: none;
		font-family: "Poppins";
		border: 2px solid #634eeb;
	}

	.input-field:focus {
		box-shadow: 0 0 10px #333333;
		border: 2px solid #634eeb;
	}

	.input-wrapper textarea {
		padding: 1rem;
		border: 1px solid #333333;
		height: 100px !important;
		/* border: 1px solid #ccc; */
	}

	.input-wrapper textarea:focus {
		outline: none;
		box-shadow: 0 0 10px #634eeb;
		border: 2px solid #634eeb;
	}

	.attachment-wrapper {
		margin: 15px 0;
	}

	.attachment-wrapper label {
		font-weight: 600;
	}

	.send-btn {
		background-color: #634eeb;
		color: white;
		padding: 15px 20px;
		border: none;
		cursor: pointer;
		/* width: 100%; */
		opacity: 0.9;
		font-size: 16px;
	}

	.send-btn:hover {
		opacity: 1;
	}

	a {
		color: blue;
	}

	a:hover {
		opacity: 0.8;
	}
</style>