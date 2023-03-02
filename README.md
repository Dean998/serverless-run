# Serverless App with AWS and OpenAI Image Generator

This is a simple serverless app that integrates with the OpenAI Image Generator. The app is built using the Serverless Framework and AWS Lambda.

## Getting Started

To get started, clone this repository to your local machine:

```bash
git clone https://github.com/dean998/serverless-run
```

Then, navigate to the root directory of the project and install the dependencies:

```bash
cd serverless-run
npm install
```

## Environment Variables

You will need to set up environment variables for the OpenAI API key. Create a .env file in the root of the project and add the following:

```bash
OPENAI_API_KEY=<your OpenAI API key>
```

To gain OPENAI KEY head over to 'https://platform.openai.com/account/api-keys' after you have signed in to generate a key.

## Deploying the App

To deploy the app, make sure you have the Serverless Framework installed. You can install it globally with the following command:

```bash
npm install -g serverless
```

To test serverless offline , run command:

```bash
npm run build
sls offline start
```

Then to deploy the app to your AWS account with the following command:

```bash
serverless deploy
```

## OpenAI Image Generator

This app integrates with the OpenAI Image Generator through the `openAiImageGenerator` function in the handler.ts file. This function sends a POST request to the OpenAI API to generate an image based on a prompt.

The generated image URL is returned as the response body. You can modify this function to do anything with the generated image URL, such as display the image on a web page or save it to an S3 bucket.

## Conclusion

That's it! You now have a serverless app that integrates with the OpenAI Image Generator. Feel free to modify the app to suit your needs and experiment with other AWS services.
