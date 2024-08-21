import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SystemConfigDocument = HydratedDocument<SystemConfig>;

@Schema({ versionKey: false })
export class SystemConfig {
  @Prop({ type: Number, required: true })
  loginSessionDuration: number;
  @Prop({ type: Number, required: true })
  captchaValidityPeriod: number;
  @Prop({ type: String, required: true })
  systemSenderEmail: string;
}

export const SystemConfigSchema = SchemaFactory.createForClass(SystemConfig);
