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
    example: '1',
    description: 'Bank id',
  })
  readonly bank: number;

  @ApiProperty({
    example: '1',
    description: 'Category id',
  })
  readonly category: number;
}
