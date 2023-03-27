export const DB_ROLE_MODEL = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: 'roles',
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    AttributeDefinitions: [
      {
        AttributeName: 'rol_id',
        AttributeType: 'S',
        unique: true,
      },
      {
        AttributeName: 'rol_name',
        AttributeType: 'S',
      },
      {
        AttributeName: 'rol_alias',
        AttributeType: 'S',
        unique: true,
      },
    ],
    KeySchema: [
      {
        AttributeName: 'rol_id',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'rol_id',
        KeyType: 'RANGE',
      },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  },
};
