import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('producers')
export class Producer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  senha!: string;

  @Column({ unique: true })
  telefone!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
