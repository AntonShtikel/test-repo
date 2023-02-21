import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Bank } from './bank.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
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

  async getOneBank(id: number): Promise<Bank> {
    return await this.bankRepository.findOne({ where: { id } });
  }

  async deleteBank(name: string): Promise<string> {
    if (await this.bankRepository.delete({ name })) {
      return `${name} deleted`;
    }
    return 'deleting error';
  }

  async editBank(id, updateBankDto: CreateBankDto): Promise<UpdateResult> {
    const checkBank = await this.bankRepository.findOne({ where: { id } });
    if (!checkBank) {
      throw new HttpException('Bank does not exist', HttpStatus.BAD_REQUEST);
    }
    return await this.bankRepository.update(id, updateBankDto);
  }
}
