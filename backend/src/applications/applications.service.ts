import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  create(data: CreateApplicationDto) {
    const { company, role, status, link, notes } = data;

    return this.prisma.application.create({
      data: {
        company,
        role,
        status: status ?? 'applied',
        link,
        notes,
      },
    });
  }
}

