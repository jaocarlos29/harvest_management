import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';
import { ProducersModule } from './modules/producers/producers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProducersModule,
  ],
})
export class AppModule { }
