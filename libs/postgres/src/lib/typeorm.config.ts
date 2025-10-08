import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { User, Quote, RaceResult } from './entities';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST') || 'localhost',
  port: +(configService.get<number>('DB_PORT') || 5432),
  username: configService.get<string>('DB_USERNAME') || 'postgres',
  password: configService.get<string>('DB_PASSWORD') || '1234',
  database: configService.get<string>('DB_DATABASE') || 'angular-typeracer',
  migrations: ['dist/libs/postgres/src/lib/migrations/*.js'],
  entities: [User, Quote, RaceResult],
  synchronize: false,
  logging: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);
