import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}
  async createSubject(subjectDto: CreateSubjectDto) {
    const findSubject = await this.prisma.subject.findUnique({
      where: { name: subjectDto.name },
    });
    if (findSubject)
      throw new ForbiddenException('Bu fan alaqachon yaratilgan');
    return await this.prisma.subject.create({ data: subjectDto });
  }
  async getAll() {
    return this.prisma.subject.findMany();
  }
  async findById(id: number) {
    const findSubject = this.prisma.subject.findUnique({ where: { id } });
    if (!findSubject)
      throw new ForbiddenException('Bunday id li fan topilmadi');
    return findSubject;
  }
  async updateById(id: number, updateDto: UpdateSubjectDto) {
    const findSubject = await this.prisma.subject.findUnique({ where: { id } });
    if (!findSubject)
      throw new ForbiddenException('Bunday id li fan topilmadi');
    return await this.prisma.subject.update({
      where: { id },
      data: { ...updateDto },
    });
  }
  async deleteById(id: number) {
    const findSubject = await this.prisma.subject.findUnique({ where: { id } });
    if (!findSubject)
      throw new ForbiddenException('Bunday id li fan topilmadi');
    return await this.prisma.subject.delete({ where: { id } });
  }
}
