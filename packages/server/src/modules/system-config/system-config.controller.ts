import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { UpdateSystemConfigDto, UpdateSystemConfigSchema } from './dto/update.dto';
import { SystemConfigService } from './system-config.service';

@ApiTags('System Config')
@Controller('system-config')
export class SystemConfigController {
  constructor(private readonly systemConfigService: SystemConfigService) {}

  @Get('get')
  async getSystemConfig() {
    return await this.systemConfigService.getSystemConfig();
  }

  @Put('update')
  async updateSystemConfig(@Body(new ZodValidationPipe(UpdateSystemConfigSchema)) body: UpdateSystemConfigDto) {
    return await this.systemConfigService.updateSystemConfig(body);
  }
}
