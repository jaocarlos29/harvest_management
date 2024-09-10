import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'database.sqlite', // Banco de dados em memória
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // Sincroniza automaticamente as entidades com o banco de dados
};
