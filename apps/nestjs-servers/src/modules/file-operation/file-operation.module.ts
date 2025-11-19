import { Module } from '@nestjs/common';
import { FileOperationService } from './file-operation.service';
import { FileOperationController } from './file-operation.controller';

@Module({
  controllers: [FileOperationController],
  providers: [FileOperationService],
})
export class FileOperationModule {}
