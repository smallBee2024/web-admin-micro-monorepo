import { Controller, Get, Post, Body, Patch, Param, Delete, Res, BadRequestException } from '@nestjs/common';
import { FileOperationService } from './file-operation.service';
import { CreateFileOperationDto } from './dto/create-file-operation.dto';
import { UpdateFileOperationDto } from './dto/update-file-operation.dto';
// import { FileOperationService } from './file-operation.service';
import { FastifyReply } from 'fastify';

@Controller('file-operation')
export class FileOperationController {
  constructor(private readonly fileOperationService: FileOperationService) {}

  @Post()
  create(@Body() createFileOperationDto: CreateFileOperationDto) {
    return this.fileOperationService.create(createFileOperationDto);
  }

  @Post('htmlToDocx')
  async htmlToDocx(@Body() body: { html: string }, @Res() res: FastifyReply) {
    console.log('body', body);
    if (!body || typeof body.html !== 'string') {
      throw new BadRequestException('请求体缺少 html 字符串');
    }
    const buffer = await this.fileOperationService.generateDocxFromHtml(body.html);
    console.log('buffer', buffer);
    res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.header('Content-Disposition', 'attachment; filename="document.docx"');
    return res.raw.end(buffer);
  }

  // @Get()
  // findAll() {
  //   return this.fileOperationService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.fileOperationService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFileOperationDto: UpdateFileOperationDto) {
  //   return this.fileOperationService.update(+id, updateFileOperationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.fileOperationService.remove(+id);
  // }
}
