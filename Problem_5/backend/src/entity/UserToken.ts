import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class UserToken {
  @PrimaryGeneratedColumn()
  token_id!: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  token!: string;

  @CreateDateColumn()
  created_at!: Date;

  @Column({ type: 'timestamp' })
  expires_at!: Date;

  @ManyToOne(() => User, (user) => user.tokens)
  user!: User;
}
