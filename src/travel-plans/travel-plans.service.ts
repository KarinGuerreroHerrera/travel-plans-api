import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelPlan } from './entities/travel-plan.entity';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { CountriesService } from '../countries/countries.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectRepository(TravelPlan)
    private readonly travelPlanRepo: Repository<TravelPlan>,
    private readonly countriesService: CountriesService,
    private readonly usersService: UsersService,
  ) {}

  async create(dto: CreateTravelPlanDto): Promise<TravelPlan> {
    await this.usersService.findOne(dto.userId);
    await this.countriesService.resolveCountry(dto.countryCode);
    const plan = this.travelPlanRepo.create({
      ...dto,
      countryCode: dto.countryCode.toUpperCase(),
      expenses: [],
    });
    return this.travelPlanRepo.save(plan);
  }

  findAll(): Promise<TravelPlan[]> {
    return this.travelPlanRepo.find();
  }

  async findOne(id: number): Promise<TravelPlan> {
    const plan = await this.travelPlanRepo.findOne({ where: { id } });
    if (!plan) throw new NotFoundException(`TravelPlan #${id} not found`);
    return plan;
  }

  async remove(id: number): Promise<void> {
    const plan = await this.findOne(id);
    await this.travelPlanRepo.remove(plan);
  }

  async addExpense(id: number, dto: CreateExpenseDto): Promise<TravelPlan> {
    const plan = await this.findOne(id);
    plan.expenses = [...plan.expenses, dto];
    return this.travelPlanRepo.save(plan);
  }
}
