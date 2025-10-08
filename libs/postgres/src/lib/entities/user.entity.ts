import { RaceResult } from './race-result.entity';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'boolean' })
  is_guest: boolean;

  @Column({ type: 'uuid', nullable: true })
  room_id: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', default: Date.now() })
  created_at: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', default: Date.now() })
  updated_at: Date;

  @Column({ type: 'timestamptz', default: Date.now() })
  last_active: Date;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  refresh_token: string;

  @OneToMany(() => RaceResult, (result) => result.user)
  race_results: RaceResult[];
}
