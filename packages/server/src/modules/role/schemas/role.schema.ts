import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

export enum RoleStatus {
  NORMAL = 'NORMAL',
  DISABLED = 'DISABLED',
  DELETED = 'DELETED',
}

@Schema({ versionKey: false })
export class Role {
  @Prop({ type: String, required: true, maxLength: 50, unique: true })
  name: string;
  @Prop({ type: String, enum: Object.values(RoleStatus), default: RoleStatus.NORMAL })
  status: RoleStatus;
  @Prop({ type: Boolean, default: false })
  isAdminRole: boolean;
  @Prop({ type: Boolean, default: false })
  isSystemRole: boolean;
  @Prop({ type: [{ type: String, ref: 'Permission' }], default: [], ref: 'Permission' })
  permissions: string[];
  @Prop({ type: String, default: '' })
  description?: string;
  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;
  @Prop({ type: Date, default: Date.now })
  updatedAt?: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
