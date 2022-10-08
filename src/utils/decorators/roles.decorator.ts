import { SetMetadata } from '@nestjs/common';
import { AccountRole } from '../constants';

export const Roles = (...roles: AccountRole[]) => SetMetadata('roles', roles);
