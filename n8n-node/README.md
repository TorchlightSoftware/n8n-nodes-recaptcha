![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-recaptcha

A ReCaptcha backend that you can forward to any URL.

## Usage

1. Set up an n8n account.
2. Create a new worfklow.
3. Add a webhook.
4. Add an n8n-recaptcha node. Configure it with your secret key.
5. Add an HTTP node.  Call the endpoint you want to protect, and pass it the data from the n8n-recaptcha node.
6. Add the n8n-recaptcha javascript to your website.
7. Add attributes to your form to configure your site-key.
8. Send the form data to your n8n webhook.

## Development

You need the following installed on your development machine:

* [git](https://git-scm.com/downloads)
* Node.js and npm. Minimum version Node 16. You can find instructions on how to install both using nvm (Node Version Manager) for Linux, Mac, and WSL [here](https://github.com/nvm-sh/nvm). For Windows users, refer to Microsoft's guide to [Install NodeJS on Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).
* Install n8n with:
	```
	npm install n8n -g
	```
*
* Recommended: follow n8n's guide to [set up your development environment](https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/).

### Quickstart:

```bash
# In this directory
$ npm link

# anywhere
# (this will create the .n8n directory)
$ n8n start
$ ^C

# In .n8n
$ mkdir custom
$ cd custom
$ npm init
$ npm link n8n-nodes-recaptcha

# anywhere
$ n8n start
```

### Running Tests:

Before you run the tests:

```
cp setJestEnvVars-example.js setJestEnvVars.js
```

And change the file to include your Google ReCaptcha secret and token.  You can [get your site and secret key by registering at Google ReCaptcha](https://www.google.com/recaptcha/admin).  You can get a token by using the test site here.

## Building Your Own n8n Nodes

Refer to our [documentation on creating nodes](https://docs.n8n.io/integrations/creating-nodes/) for detailed information on building your own nodes.

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
