// import { EntityRepository, Repository } from 'typeorm';
// import { Producer } from '../entities/producer.entity';

// @EntityRepository(Producer)
// export class ProducerRepository extends Repository<Producer> {

//   // Função personalizada para buscar um produtor por email
//   async findByEmail(email: string): Promise<Producer | null> {
//     return this.findOne({ where: { email } });
//   }

//   // Função personalizada para buscar todos os produtores ativos (se houver campo 'active')
//   async findActiveProducers(): Promise<Producer[]> {
//     return this.find({ where: { active: true } });
//   }
// }
