import type { AWS } from '@serverless/typescript';

import listRoles from '@functions/roles/list';
import { DB_ROLE_MODEL } from '@models/dbmodel';

const serverlessConfiguration: AWS = {
  service: 'aws-sls-ts-inventory-api',
  frameworkVersion: '3',
  disabledDeprecations: ['CLI_OPTIONS_SCHEMA'],
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-dynamodb-local',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:DescribeTable',
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
            ],
            Resource: '*',
          },
        ],
      },
    },
  },

  // import the function via paths
  functions: { listRoles },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      roles: {
        ...DB_ROLE_MODEL,
      },
    },
  },
};

module.exports = serverlessConfiguration;
