import { Module } from '@nestjs/common';
import { ProducersService } from './producers.service';
import { ProducersController } from './producers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from './entities/producer.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Producer])],
    controllers: [ProducersController],
    providers: [ProducersService],
})
export class ProducersModule { }
