import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'bank' })
export class Bank extends BaseEntity {
  @ApiProperty({
    example: '79abca65-bb8f-4593-bbff-8cf71c4514cb',
    description: 'Primary key',
  })
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @ApiProperty({
    example: 'ExampleBank',
    description: 'Bank name',
  })
  @Column({ unique: true, nullable: false })
  name: string;
  @ApiProperty({
    example: '1273817231',
    description: 'Bank balance',
  })
  @Column()
  balance: number;
}
