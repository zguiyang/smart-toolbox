import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { PermissionCodeEnums } from '../../../enums/permissions.enum';

export type PermissionDocument = HydratedDocument<Permission>;
@Schema({ versionKey: false })
export class Permission {
  @Prop({ required: true, type: String })
  label: string;
  @Prop({ required: true, type: String, enum: Object.values(PermissionCodeEnums), unique: true })
  code: PermissionCodeEnums;
  @Prop({ type: String, enum: Object.values(PermissionCodeEnums), default: null })
  parentCode: PermissionCodeEnums | null;
  @Prop({ required: true, type: String })
  url: string;
  @Prop({ type: String, default: '' })
  description?: string;
  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;
  @Prop({ type: Date, default: Date.now })
  updatedAt?: Date;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
