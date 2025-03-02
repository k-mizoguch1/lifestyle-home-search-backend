import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Layout, BUILDING_TYPE } from '../home.enum';

@Entity('homes')
export class Home {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  prefecture: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column()
  rent: number;

  @Column({
    type: 'enum',
    enum: Layout,
  })
  layout: Layout;

  @Column()
  year: number;

  @Column({
    type: 'enum',
    enum: BUILDING_TYPE,
  })
  building: BUILDING_TYPE;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
