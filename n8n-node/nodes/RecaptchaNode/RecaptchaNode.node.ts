import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow'
import { fetch } from 'undici'

interface Body {
	'g-recaptcha-response'?: string,
}

// testable function
export async function runRecaptcha({ body, secret }: { body: Body, secret: string }): Promise<Body> {
	const token = body['g-recaptcha-response']

	// verify the recaptcha with Google
	// Google expects the params in the URL even though it's a POST
	const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`, {
		method: 'post',
	})

	// {
	// 	  "success": true|false,
	// 	  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
	// 	  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
	// 	  "error-codes": [...]        // optional
	// }
	const data: any = await response.json()

	if (data.success) {
		delete body['g-recaptcha-response']
		return body

	} else {
		const codes = (data['error-codes'] || []).join('|')
		throw new Error(`reCaptcha failed: ${codes}`)
	}
}

export class RecaptchaNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Recaptcha Node',
		name: 'recaptchaNode',
		group: ['transform'],
		version: 1.0,
		description: 'Recaptcha Node',
		defaults: {
			name: 'Recaptcha Node',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'reCAPTCHA Secret Key',
				name: 'secret',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				placeholder: 'Placeholder value',
				description: 'Go to https://www.google.com/recaptcha/admin to set up your key',
			},
		],
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData()
		const node = this.getNode()
		const secret = this.getNodeParameter('secret', 0) as string

		let item: INodeExecutionData

		// Iterate over all input items and run our function, with error handling boilerplate
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				item = items[itemIndex]
				const body = (item.json.body || {}) as Body

				// runRecaptcha and assign results back to the same item
				item.json.body = await runRecaptcha({ body, secret })
			} catch (error) {
				if (this.continueOnFail()) {
					items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex })

				} else {
					throw new NodeOperationError(node, error, {
						itemIndex,
					})
				}
			}
		}

		return this.prepareOutputData(items)
	}
}
