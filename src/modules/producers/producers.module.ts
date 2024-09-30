import { Module } from '@nestjs/common';
import { ProducersService } from './services/producers.service';
import { ProducersController } from './controllers/producers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from './entities/producer.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Producer])],
    controllers: [ProducersController],
    providers: [ProducersService],
})
export class ProducersModule { }
