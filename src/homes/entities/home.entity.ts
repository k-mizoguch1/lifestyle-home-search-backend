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

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column()
  heights: number;

  @Column()
  area: number;

  @Column()
  admin: number;

  @Column()
  deposit: number;

  @Column({ type: 'varchar', length: 255 })
  photo_url: string;

  @Column({ type: 'varchar', length: 255 })
  station_list: string;

  @Column({ type: 'varchar', length: 255 })
  thumbnails: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
