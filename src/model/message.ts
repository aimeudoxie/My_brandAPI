
import mongoose, { Schema, Document } from 'mongoose';

interface IMessage extends Document {
    name: string;
    email: string;
    subject: string;
    text: string;
    read:boolean;
    sentAt: Date;
}

const messageSchema: Schema = new Schema({
 name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  text: { type: String, required: true },
  read: { type: Boolean, required: true},
  sentAt: { type: Date, default: Date.now },

});

const MessageModel = mongoose.model<IMessage>('Message', messageSchema);

export { MessageModel, IMessage };
