import { Global, Module } from '@nestjs/common';
import { TimeBlockService } from './time-block.service';
import { TimeBlockController } from './time-block.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Global()
@Module({
	controllers: [TimeBlockController],
	providers: [TimeBlockService, PrismaService],
	exports: [TimeBlockService],
})
export class TimeBlockModule {}
