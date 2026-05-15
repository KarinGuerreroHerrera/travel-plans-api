import { IsString, IsDateString, IsNotEmpty, Length, IsNumber, IsPositive } from 'class-validator';

export class CreateTravelPlanDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @Length(3, 3, { message: 'countryCode must be exactly 3 characters (Alpha-3)' })
  countryCode: string;

  @IsNumber()
  @IsPositive()
  userId: number;
}
