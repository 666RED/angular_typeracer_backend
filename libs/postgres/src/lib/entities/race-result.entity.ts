import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Quote } from './quote.entity';
import { Place } from '../models/race.model';

@Entity()
export class RaceResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 4, scale: 1 })
  wpm: number;

  @Column({ type: 'enum', enum: Place })
  place: Place;

  @Column({ type: 'int' })
  total_players: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  accuracy_percentage: number;

  @CreateDateColumn({ type: 'timestamptz', default: Date.now(), select: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: Date.now(), select: false })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.race_results, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Quote, (quote) => quote.race_results, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'quote_id' })
  quote: Quote;
}
