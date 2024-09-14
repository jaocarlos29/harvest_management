import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ProducersService } from './producers.service';
import { CreateProducerDto } from './dtos/create-producer.dto';
import { UpdateProducerDto } from './dtos/update-producer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('producers')
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
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.producersService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateProducerDto: UpdateProducerDto) {
        return this.producersService.update(id, updateProducerDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.producersService.remove(id);
    }
}
