import { RoleDto } from '@dtos/role.dtos';
import { RoleModel } from '@models/role.model';

export class RoleBuilder implements Builder<RoleModel, RoleDto> {
  transformDtoToModel(dto: RoleDto): RoleModel {
    return {
      rol_name: dto.name,
      rol_alias: dto.alias,
    };
  }
  transformModelToDto(model: RoleModel): RoleDto {
    return {
      name: model.rol_name,
      alias: model.rol_alias,
    };
  }
  transformModelsToDtos(models: RoleModel[]): RoleDto[] {
    return models.map((dto) => this.transformModelToDto(dto));
  }
  transformDtosToModels(dtos: RoleDto[]): RoleModel[] {
    return dtos.map((model) => this.transformDtoToModel(model));
  }
}
