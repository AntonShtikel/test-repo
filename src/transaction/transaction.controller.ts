import {Body, Controller, Get, Post, Headers, Req, Delete, Param} from '@nestjs/common';
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
  async create(
    @Body() transactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return await this.transactionService.createTransaction(transactionDto);
  }
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 200, type: [Transaction] })
  @Get()
  getAllTransactions() {
    return this.transactionService.getTransactions();
  }

  @ApiOperation({ summary: 'Delete one transaction' })
  @ApiResponse({ status: 200, description: `transaction 1 deleted` })
  @Delete('/:id')
  deleteBank(@Param('id') id: number) {
    return this.transactionService.deleteTransaction(id);
  }
}
