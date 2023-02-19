import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @ApiProperty({
    example: '79abca61-bb8e-4591-bbff-8cf71c4514cb',
    description: 'Primary key',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({
    example: 'ExampleCategory',
    description: 'Category name',
  })
  @Column({ nullable: false })
  name: string;
}
