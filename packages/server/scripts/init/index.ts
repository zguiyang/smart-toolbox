/**
 * Initialize the user, role, permission, and configuration tables in the database before the first system startup to ensure normal operation.
 * **/
import { NestFactory } from '@nestjs/core';
import chalk from 'chalk';
import consola from 'consola';
import * as mongoose from 'mongoose';

import { PermissionService } from '../../src/modules/permission/permission.service';
import { RoleService } from '../../src/modules/role/role.service';
import { SystemConfigService } from '../../src/modules/system-config/system-config.service';
import { UserService } from '../../src/modules/user/user.service';
import { InitModule } from './init.module';

async function bootstrap() {
  const isConfirm = await consola.prompt(
    'This operation will erase all data in the related tables and is irreversible. Do you want to continue?',
    {
      type: 'confirm',
    },
  );
  if (!isConfirm) {
    return false;
  }
  consola.start(chalk.blue('Starting seeding initial data...'));

  await mongoose.connect(process.env.MONGODB_URI, {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASSWORD,
  });

  consola.success(chalk.green('Connected to database.'));

  const app = await NestFactory.createApplicationContext(InitModule);

  const cleanConnections = ['systemconfigs', 'permissions', 'roles', 'users'];

  try {
    const permissionService = app.get(PermissionService);
    const roleService = app.get(RoleService);
    const userService = app.get(UserService);
    const systemConfigService = app.get(SystemConfigService);

    for (const connection of cleanConnections) {
      await mongoose.connection.collection(connection).deleteMany({});
    }
    consola.start(chalk.blue('Starting init system configs...'));
    await systemConfigService.initSystemConfig();
    consola.success(chalk.green('System config initialized.'));

    consola.start(chalk.blue('Starting init permissions...'));
    await permissionService.initPermissions();
    consola.success(chalk.green('Permissions initialized.'));

    consola.start(chalk.blue('Starting init roles...'));
    await roleService.initAdminRole();
    consola.success(chalk.green('Roles initialized.'));

    consola.start(chalk.blue('Starting init users...'));
    const adminRole = await roleService.getAdminRole();
    await userService.initAdminUser(adminRole);
    consola.success(chalk.green('Users initialized.'));
  } catch (error) {
    consola.error(chalk.red('seeding initial data failed.'), error);
  } finally {
    consola.success(chalk.green('Seeding initial data completed.'));
    await app.close();
    process.exit();
  }
}

void bootstrap();
