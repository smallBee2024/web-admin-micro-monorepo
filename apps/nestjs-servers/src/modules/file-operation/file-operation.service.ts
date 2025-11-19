import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFileOperationDto } from './dto/create-file-operation.dto';
import { UpdateFileOperationDto } from './dto/update-file-operation.dto';
// import * as htmlToDocx from 'html-to-docx';
const htmlToDocx = require('html-to-docx');

@Injectable()
export class FileOperationService {
  create(createFileOperationDto: CreateFileOperationDto) {
    return 'This action adds a new fileOperation';
  }

  async generateDocxFromHtml(html: string): Promise<Buffer> {
    if (typeof html !== 'string' || html.trim().length === 0) {
      throw new BadRequestException('参数 html 必须为非空字符串');
    }
    try {
      const fileBuffer = await htmlToDocx(html, null, {
        table: { row: { cantSplit: true } }, // 可选配置
        footer: false,
        pageNumber: false,
      });
      return fileBuffer;
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException('生成 Word 文档失败');
    }
  }

}
