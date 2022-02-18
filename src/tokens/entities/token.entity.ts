import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'supplier_id', unique: true, length: 32 })
  supplierId: string;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 8, unique: true })
  symbol: string;

  @Column({ name: 'genesys_date' })
  genesysDate: Date;

  @Column({ name: 'market_cap_rank' })
  marketCapRank: number;

  @Column({ name: 'supplier_last_update' })
  supplierLastUpdate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
