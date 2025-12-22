import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApplicationStatus } from '../../common/enums/application-status.enum';

export class CreateApplicationDto {
  @IsString()
  company: string;

  @IsString()
  role: string;

  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @IsOptional()
  @IsUrl()
  link?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}


