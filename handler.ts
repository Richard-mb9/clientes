import serverless from 'serverless-http';

import app from './src/index';

// eslint-disable-next-line import/prefer-default-export
export const handler = serverless(app);
