import axios, { AxiosRequestConfig } from "axios";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const hello = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello world!" }),
  };
};

export const random = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const response = await axios.get("https://randomuser.me/api/");
  return {
    statusCode: 200,
    body: JSON.stringify(response.data),
  };
};

export const openAi = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    };

    const data = {
      model: "text-davinci-003",
      prompt: "Say this is a test",
      temperature: 0,
      max_tokens: 7,
    };
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      data,
      config
    );
    console.log(response.data?.choices);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.log(error.message);
    console.log(error.response.data);
  }
};
export const openAiImageGenerator = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // Think of any image you would like to see and enter here into prompt as a string
  const prompt = "a blue bear with a bowl of white rice ";

  console.log(prompt);
  try {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    };

    const data = {
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    };

    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      data,
      config
    );

    const imageUrl = response.data.data[0].url;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Loading...</title>
          <style>
            body {
              background-color: #f1f1f1;
              font-family: Arial, sans-serif;
            }
            .loading-message {
              text-align: center;
              margin-top: 50px;
            }
            .redirect-message {
              text-align: center;
              margin-top: 50px;
              display: none;
            }
          </style>
        </head>
        <body>
          <div class="loading-message">
            <h1>Your image is loading...</h1>
          </div>
          <div class="redirect-message">
            <h1>Redirecting to your image...</h1>
          </div>
          <script>
            setTimeout(function() {
              document.querySelector('.loading-message').style.display = 'none';
              document.querySelector('.redirect-message').style.display = 'block';
              window.location.href = '${imageUrl}';
            }, 5000); // Set a 5-second delay before redirecting
          </script>
        </body>
      </html>
    `;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: html,
    };
  } catch (error) {
    console.log(error.message);
    console.log(error.response.data);
  }
};
