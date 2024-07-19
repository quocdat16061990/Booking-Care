import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import path from 'path';
import * as process from 'process';
import Address from 'src/domain/user/entity/address.entity';
import User from 'src/domain/user/entity/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

export const config = {
  type: process.env?.DB_TYPE || 'postgres',
  host: process.env?.DATABASE_HOST || 'localhost',
  port: process.env?.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Address],
  migrations: [path.join(__dirname, '../migrations/*{.ts,.js}')],
  migrationsRun: Boolean(process.env?.DATABASE_RUN_MIGRATIONS || false),
  autoLoadEntities: true,
  synchronize: false,
  logging: process.env?.DATABASE_DEBUG_MODE === 'true' || false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
