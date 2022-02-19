import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const FIRST_GENESYS_DATE = new Date('2009-01-03');

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

  @Column({ name: 'genesys_date', nullable: true })
  genesysDate: Date;

  @Column({ name: 'market_cap_rank', nullable: true })
  marketCapRank: number;

  @Column({ name: 'supplier_last_update', nullable: true })
  supplierLastUpdate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  private setDefaultGenesys(): void {
    if (this.genesysDate === null) {
      this.genesysDate = FIRST_GENESYS_DATE;
    }
  }
}
