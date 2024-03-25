import { runRecaptcha } from "./RecaptchaNode.node";

const body = {
	email: 'foo@test.com',
	'g-recaptcha-response': (process.env.GRECAPTCHA_TOKEN || '') as string
}

const secret = (process.env.GRECAPTCHA_SECRET || '') as string

// Why is this test important?  Because if we got "timeout-or-duplicate" then at least we did not get
// "missing-input-secret" or "missing-input-response".  So google successfully received our parameters
// and is just reporting that the token is stale.
test('initialize', async () => {
	await expect(runRecaptcha({ body, secret })).rejects.toThrow('reCaptcha failed: timeout-or-duplicate');
})
