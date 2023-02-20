import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { BankModule } from './bank/bank.module';
import { ConfigModule } from '@nestjs/config';
import { Bank } from './bank/bank.entity';
import { CategoryModule } from './categories/category.module';
import { Category } from './categories/category.entity';
import { Transaction } from './transaction/transaction.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Bank, Category, Transaction],
      synchronize: true,
    }),
    BankModule,
    CategoryModule,
    Transaction,
  ],
})
export class AppModule {}
