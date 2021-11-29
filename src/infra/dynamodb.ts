import AWS from 'aws-sdk';
import getEnv from '../utils/getEnv';

const awsConfig = {
  region: getEnv('REGION'),
  endpoint: getEnv('DYNAMO_ENDPOINT'),
  accessKeyId: getEnv('ACCESS_KEY_ID'),
  secretAccessKey: getEnv('SECRET_ACCESS_KEY'),
};

AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

export default docClient;
