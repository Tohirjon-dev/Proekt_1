import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}
  async create(createTopicDto: CreateTopicDto) {
    const findTopic = await this.prisma.topic.findUnique({
      where: { name: createTopicDto.name },
    });
    if (findTopic) throw new ForbiddenException('Bu mavzu oldin yaratilgan');
    return await this.prisma.topic.create({ data: createTopicDto });
  }

  async findAll() {
    return await this.prisma.topic.findMany();
  }

  async findOne(id: number) {
    const findTopic = await this.prisma.topic.findUnique({ where: { id } });
    if (!findTopic)
      throw new ForbiddenException('Bunday id li mavzu topilmadi');
    return findTopic;
  }

  async update(id: number, updateTopicDto: UpdateTopicDto) {
    const findTopic = await this.prisma.topic.findUnique({ where: { id } });
    if (!findTopic)
      throw new ForbiddenException('Bunday id li mavzu topilmadi');
    return await this.prisma.topic.update({
      where: { id },
      data: updateTopicDto,
    });
  }

  async remove(id: number) {
    const findTopic = await this.prisma.topic.findUnique({ where: { id } });
    if (!findTopic)
      throw new ForbiddenException('Bunday id li mavzu topilmadi');
    return await this.prisma.topic.delete({ where: { id } });
  }
  async getSubjectByTopics(subjectId: number) {
    const findSubject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
    });
    if (!findSubject)
      throw new ForbiddenException('Bunday id li fan topilmadi');
    return await this.prisma.subject.findUnique({
      where: { id: subjectId },
      include: { topics: true },
    });
  }
}
