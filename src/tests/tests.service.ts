import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { pseudoRandomBytes } from 'crypto';

@Injectable()
export class TestsService {
  constructor(private prisma: PrismaService) {}
  async create(createTestDto: CreateTestDto) {
    const findTest = await this.prisma.test.findUnique({
      where: { title: createTestDto.title },
    });
    if (findTest) throw new ForbiddenException('Bu test allaqachon yaratilgan');
    return await this.prisma.test.create({ data: createTestDto });
  }

  async findAll() {
    return await this.prisma.test.findMany();
  }

  async findOne(id: number) {
    const findTest = await this.prisma.test.findUnique({ where: { id } });
    if (!findTest) throw new ForbiddenException('Bunday id li test topilmadi');
    return findTest;
  }

  async update(id: number, updateTestDto: UpdateTestDto) {
    const findTest = await this.prisma.test.findUnique({ where: { id } });
    if (!findTest) throw new ForbiddenException('Bunday id li test topilmadi');
    return await this.prisma.test.update({
      where: { id },
      data: updateTestDto,
    });
  }

  async remove(id: number) {
    const findTest = await this.prisma.test.findUnique({ where: { id } });
    if (!findTest) throw new ForbiddenException('Bunday id li test topilmadi');
    return await this.prisma.test.delete({ where: { id } });
  }
  async getTopicAndTests(id: number) {
    const findTopic = await this.prisma.topic.findUnique({ where: { id } });
    if (!findTopic)
      throw new ForbiddenException('Bunday id li mavzu mavjud emas');
    return await this.prisma.topic.findUnique({where:{id},include:{tests:true}})
  }
}
