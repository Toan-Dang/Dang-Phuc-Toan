import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class UserLogin {
  @PrimaryGeneratedColumn()
  login_id!: number;

  @Column({ type: 'varchar', length: 255 })
  password_hash!: string;

  @Column({ type: 'timestamp', nullable: true })
  last_login!: Date;

  @CreateDateColumn()
  created_at!: Date;
  
  @ManyToOne(() => User, (user) => user.logins)
  user!: User;
}
