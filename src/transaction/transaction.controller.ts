import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @ApiOperation({ summary: 'Transaction creation' })
  @ApiResponse({ status: 200, type: Transaction })
  @Post()
  create(@Body() transactionDto: CreateTransactionDto) {
    return this.transactionService.createTransaction(transactionDto);
  }
}
