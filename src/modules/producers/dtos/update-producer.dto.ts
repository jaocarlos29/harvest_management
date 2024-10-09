import { IsOptional, IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProducerDto {
    @ApiPropertyOptional({ description: 'Email do produtor' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ description: 'Senha do produtor' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    senha?: string;

    @ApiPropertyOptional({ description: 'Telefone do produtor' })
    @IsOptional()
    @IsNotEmpty()
    telefone?: string;
}
