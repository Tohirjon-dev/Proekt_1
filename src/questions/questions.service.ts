import { ForbiddenException, Injectable, UseGuards } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { threadId } from 'worker_threads';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}
  async create(createQuestionDto: CreateQuestionDto) {
    return await this.prisma.question.create({ data: createQuestionDto });
  }

  async findAll() {
    return await this.prisma.question.findMany();
  }

  async findOne(id: number) {
    const findQuestion = await this.prisma.question.findUnique({
      where: { id },
    });
    if (!findQuestion)
      throw new ForbiddenException('Bunday id li savol topilmadi');
    return findQuestion;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const findQuestion = await this.prisma.question.findUnique({
      where: { id },
    });
    if (!findQuestion)
      throw new ForbiddenException('Bunday id li savol topilmadi');
    return await this.prisma.question.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async remove(id: number) {
    const findQuestion = await this.prisma.question.findUnique({
      where: { id },
    });
    if (!findQuestion)
      throw new ForbiddenException('Bunday id li savol topilmadi');
    return await this.prisma.question.delete({ where: { id } });
  }
  async testAndQuestions(id: number) {
    const findTest = await this.prisma.test.findUnique({ where: { id } });
    if (!findTest) throw new ForbiddenException('Bunday id li test topilmadi');
    return await this.prisma.test.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    });
  }
}
