import SignIn from '../src/components/SignInForm.vue';

describe('SignIn', () => {
	// Inspect the raw component options
	it('has data', () => {
	  expect(typeof SignIn.data).toBe('function')
	})

	it('has data', () => {
		expect(typeof SignIn.methods).toBe('object')
	})
});
