import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UsersModule {}
