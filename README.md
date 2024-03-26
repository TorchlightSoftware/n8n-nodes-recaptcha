# n8n ReCaptcha

A ReCaptcha backend that you can forward to any URL.

## Audience

This is primarily for Webflow developers and other front end developers who are looking for a captcha solution and don't want to set up their own server.  Technically there's still a server running here, but it's in a no-code automation environment (n8n).

## Purpose

Many marketers will encounter spam as soon as they publish an open contact form of any kind.  In order to counter spam, various captcha methodologies have been created.  However, in order for these solutions to work, you need to have your own backend server, which many marketers don't have the in-house help to do.

Furthermore, many solutions have baked in captcha protections.  Webflow for instance will allow you to enable ReCaptcha for a form, and GoHighLevel has this built in as well.  But what if you want to send a form submission from Webflow to GoHighLevel?  Now the front end form (Webflow) doesn't have any knowledge about the backend, or any control over the implementation.  So a person without coding skills is again left exposed to spam.

The solution presented here is to offer a ReCaptcha proxy node that implements the server side logic.  Only if the ReCaptcha is successful will your protected URL be called.  The protected URL is never exposed to the user's browser, so there is no obvious way to circumvent this method of protection.

### Why n8n?

This solution is implemented as an n8n Node.  n8n is a low-code/no-code automation environment.  You can accomplish similar things in Zapier or Make.

I like n8n because:

1) Pricing model is less outrageous than some competitors.
2) It's marketing focused, and has a good ecosystem focused on related use cases.
3) Your workflows are data that you own.
4) The whole system is open source.

I think this is good for people who:

1) May not have developers now, but may see that coming in the future
2) Have a web developer who doesn't do server code
3) May hit high enough transactional volumes that it makes sense to switch to their own cloud
4) May have higher privacy requirements
5) May be concerned about deplatforming
6) Want to let the company grow organically with no-code solutions that later become augmented and interoperable with custom code

Your requirements may vary.

### What if I don't want to or can't use n8n?

Something similar to what I've built here could be built using Heroku or Netlify or a serverless function.  But these solutions are going to be a little bit more technical than using n8n would be.  Unfortunately if you're on Zapier or Make, those platforms don't allow this kind of flexibility to build a custom server as I have done here and publish it as a Node that others can use.

If enough people want an alternative, let me know what you would prefer: Heroku, Netlify, or a serverless function.  And I'll repackage what I have here so that you can use it in that way.

## How to use it

1. [Register a Google Recaptcha site](https://www.google.com/recaptcha/admin).  Note your Secret (step 4) and Sitekey (step 8).
2. [Set up an n8n account](https://app.n8n.cloud/login).
3. Create a new worfklow.
4. Add a webhook.  Note the URL for step 8.
5. Add a Recaptcha Node. Configure it with your secret key.
6. Add an HTTP node.  Call the endpoint you want to protect, and pass it the data from the Recaptcha Node.
7. Add the [Google Recaptcha Javascript to your website](https://developers.google.com/recaptcha/docs/v3).
8. Add attributes to your form to configure your site-key.
9. Send the form data to your n8n webhook.

## Running the Test Form

If you want to test your n8n setup with a form that's known to work, I've provided a test form for that.

You can access a [hosted version of the test form here](https://captcha-demo.tlsft.com/).  That's running an unmodified version of the code [here](test-page/index.html).  If you want to run it yourself:

```bash
git clone git@github.com:TorchlightSoftware/n8n-nodes-recaptcha.git
npm i -g node-static
cd n8n-nodes-recaptcha/test-page
static .
```
Then visit http://127.0.0.1:8080 in your browser.
