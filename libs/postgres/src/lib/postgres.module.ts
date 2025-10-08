import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'libs/postgres/src/lib/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ConfigModule],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class PostgresModule {}
