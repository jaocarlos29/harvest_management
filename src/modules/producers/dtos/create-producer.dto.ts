import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProducerDto {
    @ApiProperty({ description: 'Nome do produtor' })
    @IsNotEmpty()
    nome!: string;

    @ApiProperty({ description: 'Email do produtor' })
    @IsEmail()
    email!: string;

    @ApiProperty({ description: 'Senha do produtor' })
    @IsNotEmpty()
    senha!: string;

    @ApiProperty({ description: 'Telefone do produtor' })
    @IsNotEmpty()
    telefone!: string;
}
