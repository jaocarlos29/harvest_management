import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Producer } from '../entities/producer.entity';
import { CreateProducerDto } from '../dtos/create-producer.dto';
import { UpdateProducerDto } from '../dtos/update-producer.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class ProducersService {
    constructor(
        @InjectRepository(Producer)
        private producersRepository: Repository<Producer>,
    ) { }

    async create(createProducerDto: CreateProducerDto) {
        const { email, telefone, senha } = createProducerDto;

        const existingProducerByEmail = await this.producersRepository.findOne({ where: { email } });
        const existingProducerByTelefone = await this.producersRepository.findOne({ where: { telefone } });

        const errors = [];

        if (existingProducerByEmail) {
            errors.push('Email já está em uso');
        }

        if (existingProducerByTelefone) {
            errors.push('Telefone já está em uso');
        }

        if (errors.length > 0) {
            throw new ConflictException(errors.join(' e '));
        }

        try {
            const saltRounds = 10; // Você pode ajustar os rounds conforme necessário
            const hashedPassword = await bcrypt.hash(senha, saltRounds);

            const producer = this.producersRepository.create({
                ...createProducerDto,
                senha: hashedPassword,
            });
            return await this.producersRepository.save(producer);
        }
        catch (error) {
            if (error instanceof QueryFailedError && error.driverError.code === 'SQLITE_CONSTRAINT') {
                if (error.driverError.message.includes('producers.email')) {
                    errors.push('Email já está em uso');
                }
                if (error.driverError.message.includes('producers.telefone')) {
                    errors.push('Telefone já está em uso');
                }

                if (errors.length > 0) {
                    throw new ConflictException(errors.join(' e '));
                }
            }
            throw new InternalServerErrorException('Erro ao criar o produtor');
        }
    }

    async findAll() {
        try {
            return await this.producersRepository.find();
        } catch (error) {
            console.error('Erro ao buscar os produtores:', error);
            throw new InternalServerErrorException('Erro ao buscar os produtores');
        }
    }

    async findOne(id: number) {
        try {
            const producer = await this.producersRepository.findOne({ where: { id } });

            if (!producer) {
                throw new NotFoundException(`Produtor com id ${id} não encontrado`);
            }

            return producer;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error(`Erro ao buscar o produtor com id ${id}:`, error);
            throw new InternalServerErrorException('Erro ao buscar o produtor');
        }
    }

    async update(id: number, updateProducerDto: UpdateProducerDto) {
        try {
            const producer = await this.producersRepository.findOne({ where: { id } });

            if (!producer) {
                throw new NotFoundException(`Produtor com id ${id} não encontrado`);
            }

            if (updateProducerDto.senha) {
                const saltRounds = 10;
                updateProducerDto.senha = await bcrypt.hash(updateProducerDto.senha, saltRounds);
            }

            Object.assign(producer, updateProducerDto);
            return await this.producersRepository.save(producer);
        }
        catch (error) {
            console.error(`Erro ao atualizar o produtor com id ${id}:`, error);

            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Erro ao atualizar o produtor');
        }
    }

    async remove(id: number) {
        try {
            const deleteResult = await this.producersRepository.delete(id);

            if (!deleteResult.affected) {
                throw new NotFoundException(`Produtor com id ${id} não encontrado`);
            }
            return deleteResult;
        }
        catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error(`Erro ao deletar o produtor com id ${id}:`, error);
            throw new InternalServerErrorException('Erro ao deletar o produtor');
        }
    }
}
