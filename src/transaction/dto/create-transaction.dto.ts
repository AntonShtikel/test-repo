import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    example: '100',
    description: 'Transaction amount',
  })
  readonly amount: number;

  @ApiProperty({
    example: 'true',
    description: 'Profitable',
  })
  readonly type: boolean;

  @ApiProperty({
    example: 'd30accd9-20d3-4129-99b7-909482a0d0c4',
    description: 'Bank id',
  })
  readonly bankId: number;

  @ApiProperty({
    example: '176412ff-8baa-4954-815f-74af3ec13c33',
    description: 'Category id',
  })
  readonly categoryId: number;
}
