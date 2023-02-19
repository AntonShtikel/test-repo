import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'ExampleCategory',
    description: 'Category example',
  })
  readonly name: string;
}
