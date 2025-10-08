import { RaceResult } from './race-result.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length } from '../models/quote.model';

@Entity()
export class Quote {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  text: string;

  @Column({ type: 'int' })
  total_characters: number;

  @Column({ type: 'enum', enum: Length })
  length: Length;

  @CreateDateColumn({ type: 'timestamptz', default: Date.now(), select: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: Date.now(), select: false })
  updated_at: Date;

  @OneToMany(() => RaceResult, (result) => result.quote)
  race_results: RaceResult[];
}
