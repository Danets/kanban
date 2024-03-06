import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Global()
@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService],
	exports: [UserService],
})
export class UserModule {}
