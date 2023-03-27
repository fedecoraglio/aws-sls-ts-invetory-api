import { RoleRepository } from '@repositories/role.repository';
import { ListRoleDto } from '@dtos/role.dtos';
import { RoleBuilder } from '@builders/role-builder';

export class RoleService {
  private readonly roleRepository = RoleRepository.getInstance();
  private readonly roleBuilder = new RoleBuilder();

  async getRoles(): Promise<ListRoleDto> {
    try {
      const resp = await this.roleRepository.getRoles();
      return {
        count: resp.count,
        items: this.roleBuilder.transformModelsToDtos(resp.items),
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
