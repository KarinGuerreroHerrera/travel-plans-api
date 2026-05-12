import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { RestCountriesProvider } from './restcountries.provider';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
    private readonly restCountriesProvider: RestCountriesProvider,
  ) {}

  async resolveCountry(alpha3: string): Promise<Country> {
    const code = alpha3.toUpperCase();

    const cached = await this.countryRepo.findOne({ where: { alpha3Code: code } });
    if (cached) return cached;

    try {
      const data = await this.restCountriesProvider.getByAlpha3(code);
      const country = this.countryRepo.create(data as Country);
      return await this.countryRepo.save(country) as unknown as Country;
    } catch {
      throw new NotFoundException(`Country with code "${code}" not found`);
    }
  }
}