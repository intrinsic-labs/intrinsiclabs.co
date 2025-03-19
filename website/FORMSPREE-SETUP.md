# Setting Up Formspree

This project uses [Formspree](https://formspree.io/) to handle form submissions with configuration managed through the Formspree CLI and formspree.json.

## Step 1: Create a Formspree Account

If you don't already have one, sign up for a Formspree account at [formspree.io](https://formspree.io/).

## Step 2: Formspree Project Setup

1. Log in to your Formspree account
2. Create a new project (or use an existing one)
3. Note your **Project ID** which is already configured in `.env.local`

## Step 3: Install the Formspree CLI

The Formspree CLI is used to deploy form configurations from formspree.json:

```bash
npm install -g @formspree/cli
```

To log in:

```bash
formspree login
```

## Step 4: Deploy the Form Configuration

The form configuration is defined in `formspree.json`. To deploy this configuration to Formspree:

```bash
cd website
formspree deploy
```

This will create or update your form based on the configuration in the JSON file.

## Step 5: Customize Your Email Address

Before deploying, update the email address in `formspree.json` under the actions section:

```json
"actions": [
  {
    "type": "email",
    "to": "your-email@example.com"  // Replace with your actual email
  }
]
```

## Step 6: Additional Configuration Options

You can further customize your form in the `formspree.json` file:

- Add spam protection settings
- Configure reCAPTCHA
- Set up webhooks
- Add email templates

See the [Formspree JSON documentation](https://help.formspree.io/hc/en-us/articles/360053906373-The-formspree-json-File) for more options.

## Testing Your Form

Once everything is set up and deployed, test your form by submitting a test message. You should see the submission in your Formspree dashboard.

## Troubleshooting

If you encounter issues:

1. Check that your project ID in `.env.local` is correct
2. Verify that `formspree.json` has been properly deployed using `formspree deploy`
3. Ensure the form name in your React component matches the key in formspree.json
4. Run `formspree status` to check the deployment status of your forms
5. Check the browser console for any errors

For more information, visit the [Formspree CLI documentation](https://help.formspree.io/hc/en-us/articles/360053819114-The-Formspree-CLI). 