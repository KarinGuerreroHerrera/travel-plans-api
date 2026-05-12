import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RestCountriesProvider {
  constructor(private readonly httpService: HttpService) {}

  async getByAlpha3(code: string): Promise<any> {
    const url = `https://restcountries.com/v3.1/alpha/${code}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    const c = data[0];

    return {
      alpha3Code: c.cca3,
      name: c.name.common,
      region: c.region,
      capital: c.capital?.[0] ?? 'N/A',
      population: c.population,
      flagUrl: c.flags?.png ?? '',
    };
  }
}