import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs('jwt_config', (): JwtModuleOptions => {
  return {
    secret: process.env.jwtKey,
    signOptions: {
      expiresIn: '1d',
    },
  };
});
