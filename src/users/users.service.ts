import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { userPayload } from 'src/common/types/user-payload.types';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    const findUSer = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });
    if (findUSer)
      throw new ConflictException("Siz allaqachion ro'yxatdan o'tgansiz");
    return await this.prisma.user.create({ data: registerDto });
  }
  async login(loginDto: LoginDto) {
    const findUSer = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (!findUSer)
      throw new BadRequestException(
        "Tizimga kirishdn oldin registrasiyadan o'tishingiz shart",
      );
    if (findUSer.password !== loginDto.password)
      throw new ForbiddenException("Parol noto'g'ri");
    const token = this.jwt.sign({
      id: findUSer.id,
      email: findUSer.email,
      role: findUSer.role,
    });
    return { token, message: 'Tizimga xush kelibsiz' };
  }
  
  async getme(data: userPayload) {
    return this.prisma.user.findUnique({ where: { id: data.id } });
  }
}
