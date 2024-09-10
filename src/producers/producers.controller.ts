import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProducersService } from './producers.service';
import { CreateProducerDto } from './dtos/create-producer.dto';
import { UpdateProducerDto } from './dtos/update-producer.dto';

@Controller('producers')
export class ProducersController {
    constructor(private readonly producersService: ProducersService) { }

    @Post()
    create(@Body() createProducerDto: CreateProducerDto) {
        return this.producersService.create(createProducerDto);
    }

    @Get()
    findAll() {
        return this.producersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.producersService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateProducerDto: UpdateProducerDto) {
        return this.producersService.update(+id, updateProducerDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.producersService.remove(+id);
    }
}
