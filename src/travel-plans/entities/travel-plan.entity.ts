import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from '../../countries/entities/country.entity';

@Entity()
export class TravelPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column()
  countryCode: string;

  @Column()
  userId: number;

  @Column({ type: 'simple-json', default: '[]' })
  expenses: { description: string; amount: number; category: string }[];

  @ManyToOne(() => Country, { eager: true })
  @JoinColumn({ name: 'countryCode', referencedColumnName: 'alpha3Code' })
  country: Country;
}
