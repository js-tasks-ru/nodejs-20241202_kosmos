import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ unique: true, required: true, trim: true })
  title: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ default: false })
  isCompleted: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
