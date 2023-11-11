import mongoose, { Schema, model } from 'mongoose';

export const ChatSchema = new Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    chats: [
        {
            text: String,
            timeStamp: String,
            textOwner: String,
        }
    ]
}, { timestamps: true });

const ChatModel = model('users', ChatSchema);
export default ChatModel;