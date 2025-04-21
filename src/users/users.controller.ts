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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('register')
  async register(@Body() body: RegisterDto) {
    try {
      return await this.usersService.register(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.ALREADY_REPORTED);
    }
  }
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.usersService.login(body);
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
