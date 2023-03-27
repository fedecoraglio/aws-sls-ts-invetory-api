import { middyfy } from '@libs/lambda';

import { RoleService } from '@services/role.service';

const listRole = async (_event, _context) => {
  console.log(`Getting roles`);
  return await new RoleService().getRoles();
};

export const main = middyfy(listRole);
