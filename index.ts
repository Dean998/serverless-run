import {
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
  Handler,
} from "aws-lambda";
import * as _ from "lodash";

export const handler: Handler = async (event: APIGatewayProxyEvent) => {
  const max = 10;
  const val = _.random(max);
  const response = {
    statusCode: 200,
    body: `The random value of ${max} is : ${val} + i am working :)`,
  };
  return response;
};
