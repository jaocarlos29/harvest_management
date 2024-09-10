import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateProducerDto {
    @IsNotEmpty()
    nome!: string;

    @IsEmail()
    email!: string;

    @IsNotEmpty()
    senha!: string;

    @IsNotEmpty()
    telefone!: string;
}
