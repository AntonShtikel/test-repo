import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
import { BankService } from './bank.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Bank } from './bank.entity';
@ApiTags('Bank')
@Controller('bank')
export class BankController {
  constructor(private bankService: BankService) {}
  @ApiOperation({ summary: 'Bank creation' })
  @ApiResponse({ status: 200, type: Bank })
  @Post()
  create(@Body() bankDto: CreateBankDto) {
    return this.bankService.createBank(bankDto);
  }
  @ApiOperation({ summary: 'Get all banks' })
  @ApiResponse({ status: 200, type: [Bank] })
  @Get()
  getAllBanks() {
    return this.bankService.getAllBanks();
  }
  @ApiOperation({ summary: 'Get one bank' })
  @ApiResponse({ status: 200, type: Bank })
  @Get('/:name')
  getOneBank(@Param('name') name: string) {
    return this.bankService.getOneBank(name);
  }
  @ApiOperation({ summary: 'Delete one bank' })
  @ApiResponse({ status: 200, type: Bank })
  @Delete('/:name')
  deleteBank(@Param('name') name: string) {
    return this.bankService.deleteBank(name);
  }
}
