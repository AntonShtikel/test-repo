import { Injectable } from '@nestjs/common';
import { Bank } from './bank.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBankDto } from './dto/create-bank.dto';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank) private bankRepository: Repository<Bank>,
  ) {}

  async createBank(dto: CreateBankDto): Promise<Bank> {
    return await this.bankRepository.save(dto);
  }

  async getAllBanks(): Promise<Bank[]> {
    return await this.bankRepository.find();
  }

  async getOneBank(name: string): Promise<Bank> {
    return await this.bankRepository.findOne({ where: { name } });
  }

  async deleteBank(name: string): Promise<void> {
    await this.bankRepository.delete({ name });
  }

  async editBank() {}
}
