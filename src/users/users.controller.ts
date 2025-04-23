import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Res,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { diskStorage, Multer } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

const storage = diskStorage({
  destination: './userImages',
  filename: (req, file, cb) => {
    const uniquName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniquName + extname(file.originalname));
  },
});

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('register')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async register(
    @Body() body: RegisterDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const imageUrl = file.path;
      return await this.usersService.register(body, imageUrl);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.ALREADY_REPORTED);
    }
  }
  @Post('login')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async login(
    @Body() body: LoginDto,
    @UploadedFile() file: Express.Multer.File,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.usersService.login(body, file.path);
    const token = data.token;
    try {
      res.cookie('authToken', token, { httpOnly: true });
      return data.message;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, 500);
    }
  }
  @UseGuards(AuthGuard)
  @Get('me')
  async getme(@Req() req: Request) {
    const data = req.user;
    try {
      return await this.usersService.getme(data);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Post('createAdmin')
  @Roles('SuperAdmin')
  async createAdmin() {
    return 'Hozircha bu loyixada superAdmin mavjud emas';
  }
}
