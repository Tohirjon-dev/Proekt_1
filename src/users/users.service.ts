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
import * as fs from 'fs';
import * as crypto from 'crypto';

function getFileHash(path: string): string {
  const fileBuffer = fs.readFileSync(path);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async register(registerDto: RegisterDto, imageUrl: string) {
    if (imageUrl.length === 0)
      throw new ForbiddenException('Rasm yuklashingiz shart');
    const findUSer = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });
    if (findUSer)
      throw new ConflictException("Siz allaqachion ro'yxatdan o'tgansiz");
    return await this.prisma.user.create({
      data: { ...registerDto, imageUrl },
    });
  }
  async login(loginDto: LoginDto, UploadImagePath: string) {
    if (UploadImagePath.length === 0)
      throw new ForbiddenException('Rasmni yuklang!!!');
    const findUSer = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (!findUSer)
      throw new BadRequestException(
        "Tizimga kirishdn oldin registrasiyadan o'tishingiz shart",
      );
    if (findUSer.password !== loginDto.password)
      throw new ForbiddenException("Parol noto'g'ri");
    const hash1 = getFileHash(findUSer.imageUrl);
    const hash2 = getFileHash(UploadImagePath);

    fs.unlinkSync(UploadImagePath);
    if (hash1 !== hash2) throw new ForbiddenException("Rasm noto'g'ri");
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
