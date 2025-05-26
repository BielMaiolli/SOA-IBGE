import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class NameData extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  localidade?: string;

  @Prop({ type: Object })
  data: any;

  @Prop({ default: Date.now, expires: 86400 }) // Cache por 24 horas
  createdAt: Date;
}

export const NameDataSchema = SchemaFactory.createForClass(NameData);