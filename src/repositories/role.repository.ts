import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import dynamoDBClient from '../dbconnect';
import { ListRoleModel } from '@dtos/role.dtos';
import { RoleModel } from '@models/role.model';

const tableName = 'roles';

export class RoleRepository {
  private static instance: RoleRepository;
  private constructor(private readonly docClient: DocumentClient) {}

  static getInstance() {
    if (!RoleRepository.instance) {
      RoleRepository.instance = new RoleRepository(dynamoDBClient());
    }
    return RoleRepository.instance;
  }

  async getRoles(): Promise<ListRoleModel> {
    try {
      const resp = await this.docClient
        .scan({
          TableName: tableName,
        })
        .promise();
      return {
        count: resp.Count,
        items: (resp.Items || []) as RoleModel[],
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
