import { Prop, Schema, SchemaFactory  } from '@nestjs/mongoose';
import { HydratedDocument,  Document, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true , unique: true })
  employeeId: number;

  @Prop({ required: true })
  password: string;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});