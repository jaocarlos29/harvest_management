import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from './entities/producer.entity';
import { CreateProducerDto } from './dtos/create-producer.dto';
import { UpdateProducerDto } from './dtos/update-producer.dto';

@Injectable()
export class ProducersService {
    constructor(
        @InjectRepository(Producer)
        private producersRepository: Repository<Producer>,
    ) { }

    create(createProducerDto: CreateProducerDto) {
        const producer = this.producersRepository.create(createProducerDto);
        return this.producersRepository.save(producer);
    }

    findAll() {
        return this.producersRepository.find();
    }

    findOne(id: number) {
        return this.producersRepository.findOne({ where: { id } });
    }

    update(id: number, updateProducerDto: UpdateProducerDto) {
        return this.producersRepository.update(id, updateProducerDto);
    }

    remove(id: number) {
        return this.producersRepository.delete(id);
    }
}
