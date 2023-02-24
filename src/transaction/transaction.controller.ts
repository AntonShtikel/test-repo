import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
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
  create(@Body() transactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionService.createTransaction(transactionDto);
  }
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 200, type: [Transaction] })
  @Get()
  getAllTransactions(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.transactionService.getTransactions(+page, +limit);
  }

  @ApiOperation({ summary: 'Delete one transaction' })
  @ApiResponse({ status: 200, description: `transaction 1 deleted` })
  @Delete('/:id')
  deleteBank(@Param('id') id: number) {
    return this.transactionService.deleteTransaction(id);
  }

  @ApiOperation({ summary: 'Transactions statistic' })
  @ApiResponse({ status: 200, type: Transaction })
  @Get(':categoryId/:fromPeriod/:toPeriod')
  getCategoryStatistic(
    @Param('categoryId') categoryId: number,
    @Param('fromPeriod') fromPeriod: string,
    @Param('toPeriod') toPeriod: string,
  ): Promise<Transaction[]> {
    return this.transactionService.getStatistics(
      categoryId,
      new Date(fromPeriod),
      new Date(toPeriod),
    );
  }
}
