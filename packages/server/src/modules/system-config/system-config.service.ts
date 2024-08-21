import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { defaultSystemConfig } from '../../config/system.config';
import { SystemConfigCodeEnums } from '../../enums/code.enum';
import { ApiCommonResponse } from '../../types/response.interface';
import { I18nService } from '../i18n/i18n.service';
import { CreateSystemConfigDto } from './dto/create.dto';
import { UpdateSystemConfigDto } from './dto/update.dto';
import { SystemConfig, SystemConfigDocument } from './schemas/system-config.schema';

@Injectable()
export class SystemConfigService {
  constructor(
    private readonly i18nService: I18nService,
    @InjectModel(SystemConfig.name) private systemConfigModel: Model<SystemConfigDocument>,
  ) {}

  /**
   * get system configurations
   * @returns {Promise<ApiCommonResponse<SystemConfigDocument | null>>}
   * **/

  async getSystemConfig(): Promise<ApiCommonResponse<SystemConfigDocument | null>> {
    const systemConfig = await this.systemConfigModel.findOne({}, { _id: 0 }).exec();

    if (!systemConfig) {
      return {
        code: SystemConfigCodeEnums.GET_FAILED,
        data: null,
        msg: this.i18nService.t('systemConfig.getFailed'),
      };
    }
    return {
      data: systemConfig,
    };
  }

  /**
   * update system configurations
   * **/

  async updateSystemConfig(data: UpdateSystemConfigDto): Promise<ApiCommonResponse<SystemConfigDocument | null>> {
    const systemConfig = await this.systemConfigModel
      .findOneAndUpdate({}, data, {
        projection: { _id: 0 },
        new: true,
      })
      .exec();

    if (!systemConfig) {
      return {
        data: null,
        code: SystemConfigCodeEnums.UPDATE_FAILED,
        msg: this.i18nService.t('systemConfig.updateFailed'),
      };
    }
    return {
      data: systemConfig,
    };
  }

  /**
   * Initialize and write system configurations. This is called only once in the system database initialization script
   * **/

  async initSystemConfig(data: CreateSystemConfigDto = defaultSystemConfig) {
    const existSystemConfig = await this.systemConfigModel.find();
    if (existSystemConfig.length > 0) {
      return Promise.reject(new Error('exist system config'));
    }
    const systemConfig = await this.systemConfigModel.create({
      ...data,
    });

    return !!systemConfig;
  }
}
