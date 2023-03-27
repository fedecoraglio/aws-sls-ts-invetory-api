import { RoleModel } from '../models/role.model';

export interface ListRoleDto {
  count: number;
  items: RoleDto[];
}

export interface ListRoleModel {
  count: number;
  items: RoleModel[];
}

export interface RoleDto {
  name: string;
  alias: string;
}
