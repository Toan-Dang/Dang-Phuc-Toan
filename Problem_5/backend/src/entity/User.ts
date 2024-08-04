import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserLogin } from './UserLogin';
import { UserToken } from './UserToken';
import { Resource } from "./Resource";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  password_hash!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  // @OneToMany(() => Resource, (resource) => resource.user)
  // resources!: Resource[];

  @OneToMany(() => UserLogin, (userLogin) => userLogin.user)
  logins!: UserLogin[];

  @OneToMany(() => UserToken, (userToken) => userToken.user)
  tokens!: UserToken[];
}
