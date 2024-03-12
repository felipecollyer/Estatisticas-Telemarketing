import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenerateDataService } from './generate_data.service';
import { CreateGenerateDatumDto } from './dto/create-generate_datum.dto';
import { UpdateGenerateDatumDto } from './dto/update-generate_datum.dto';

@Controller('generate-data')
export class GenerateDataController {
  constructor(private readonly generateDataService: GenerateDataService) {}

  @Post()
  create(@Body() Body: CreateGenerateDatumDto) {
    return this.generateDataService.create(Body);
  }

  @Get()
  findAll() {
    return this.generateDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generateDataService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGenerateDatumDto: UpdateGenerateDatumDto,
  ) {
    return this.generateDataService.update(+id, updateGenerateDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generateDataService.remove(+id);
  }
}
