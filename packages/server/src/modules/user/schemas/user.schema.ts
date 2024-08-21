import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserStatus {
  NORMAL = 'NORMAL',
  DISABLED = 'DISABLED',
  DELETED = 'DELETED',
}

@Schema({ versionKey: false })
export class User {
  @Prop({ type: String, required: true, unique: true, minlength: 1, maxlength: 20 })
  username: string;
  @Prop({ type: String, required: true, minlength: 8, maxlength: 64 })
  password: string;
  @Prop({ type: String, required: false, unique: true, maxlength: 320, default: '' })
  email: string;
  @Prop({ type: Boolean, required: true, default: false })
  isAdminUser: boolean;
  @Prop({ type: Boolean, required: true, default: false })
  isInit: boolean;
  @Prop({ type: String, enum: Object.values(UserStatus), default: UserStatus.NORMAL })
  status: UserStatus;
  @Prop({
    type: [Types.ObjectId],
    ref: 'Role',
    validate: {
      validator: (values: Types.ObjectId[]) => {
        return values.length >= 1;
      },
      message: 'Roles must be at least one',
    },
  })
  roles: Types.ObjectId[];
  @Prop({ type: String, maxlength: 100 })
  nickname?: string;
  @Prop({ type: String })
  avatar?: string;
  @Prop({ type: String, maxlength: 500 })
  description?: string;
  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;
  @Prop({ type: Date, default: Date.now })
  updatedAt?: Date;
  @Prop({ type: Date })
  lastLoginAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
