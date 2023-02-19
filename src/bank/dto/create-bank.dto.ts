import { ApiProperty } from '@nestjs/swagger';

export class CreateBankDto {
  @ApiProperty({
    example: 'ExampleBank',
    description: 'Bank example',
  })
  readonly name: string;
  @ApiProperty({
    example: '1273817231',
    description: 'Bank balance',
  })
  readonly balance: number;
}
